import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AnswerStatus } from '@prisma/client';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';
import { ChallengeNotFound, InvalidRepositoryUrlError } from '@core/errors';
import { PrismaService } from '@infra/database/prisma.service';
import { AnswerChallengeInput } from './answer-challenge.input';

@Injectable()
export class AnswerChallengeService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('CHALLENGES_SERVICE')
    private readonly kafka: ClientKafka,
  ) {}

  async run(data: AnswerChallengeInput) {
    const challenge = await this.prismaService.challenge.findFirst({
      where: { id: data.challengeId },
    });

    const isValidRepoUrl = await this.checkForValidGithubUrl(
      data.repositoryUrl,
    );

    if (!challenge || !isValidRepoUrl) {
      await this.prismaService.answer.create({
        data: { grade: 0, status: AnswerStatus.Error },
      });

      throw challenge
        ? new InvalidRepositoryUrlError()
        : new ChallengeNotFound();
    }

    const answer = await this.prismaService.answer.create({
      data: {
        grade: 0,
        status: AnswerStatus.Pending,
        repositoryUrl: data.repositoryUrl,
        challengeId: data.challengeId,
      },
    });

    const answerWithGrade = await firstValueFrom(
      this.kafka.send<
        { grade: number; status: AnswerStatus },
        { submissionId: string; repositoryUrl: string }
      >('challenge.correction', {
        submissionId: answer.id,
        repositoryUrl: data.repositoryUrl,
      }),
    );

    return this.prismaService.answer.update({
      where: { id: answer.id },
      data: { grade: answerWithGrade.grade, status: answerWithGrade.status },
    });
  }

  private async checkForValidGithubUrl(repoUrl: string) {
    try {
      const [, githubUserInfo] = repoUrl.split('github.com/');
      const [githubUser, githubRepo] = githubUserInfo.split('/');

      if (!githubUser || !githubRepo) return false;

      const { data } = await axios.request<Array<{ name: string }>>({
        method: 'GET',
        url: `https://api.github.com/users/${githubUser}/repos`,
      });

      return data.some((repo) => repo.name === githubRepo);
    } catch {
      return false;
    }
  }
}
