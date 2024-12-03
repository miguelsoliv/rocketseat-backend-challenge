import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AnswerStatus } from '@prisma/client';
import axios from 'axios';
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
        data: {
          grade: -1,
          repositoryUrl: null,
          status: AnswerStatus.Error,
        },
      });

      throw !challenge
        ? new ChallengeNotFound()
        : new InvalidRepositoryUrlError();
    }

    const answer = await this.prismaService.answer.create({
      data: {
        grade: -1,
        repositoryUrl: data.repositoryUrl,
        status: AnswerStatus.Pending,
        challengeId: data.challengeId,
      },
    });

    this.kafka.send('challenge.correction', {
      submissionId: answer.id,
      repositoryUrl: data.repositoryUrl,
    });

    return answer;
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
