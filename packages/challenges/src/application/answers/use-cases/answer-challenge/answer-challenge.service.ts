import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { AnswerStatus } from '@shared/constants';
import { ChallengeNotFound } from '@shared/errors';
import {
  ANSWER_REPOSITORY_TOKEN,
  AnswerRepository,
} from '@core/repositories/answer.repository';
import { InvalidRepositoryUrlError } from '../../errors';
import { AnswerChallengeInput } from './answer-challenge.input';
import {
  CHALLENGE_REPOSITORY_TOKEN,
  ChallengeRepository,
} from '@core/repositories/challenge.repository';
import { KafkaService } from '@infra/events-handler/kafka.service';

@Injectable()
export class AnswerChallengeService {
  constructor(
    private readonly kafkaService: KafkaService,
    @Inject(ANSWER_REPOSITORY_TOKEN)
    private readonly answerRepo: AnswerRepository,
    @Inject(CHALLENGE_REPOSITORY_TOKEN)
    private readonly challengeRepo: ChallengeRepository,
  ) {}

  async run(data: AnswerChallengeInput) {
    const challenge = await this.challengeRepo.findById(data.challengeId);

    const isValidRepoUrl = await this.checkForValidGithubUrl(
      data.repositoryUrl,
    );

    if (!challenge || !isValidRepoUrl) {
      await this.answerRepo.save({ grade: 0, status: AnswerStatus.ERROR });

      throw challenge
        ? new InvalidRepositoryUrlError()
        : new ChallengeNotFound();
    }

    const answer = await this.answerRepo.save({
      grade: 0,
      status: AnswerStatus.PENDING,
      repositoryUrl: data.repositoryUrl,
      challengeId: data.challengeId,
    });

    const { grade, status } =
      await this.kafkaService.triggerChallengeAnsweredEvent({
        submissionId: answer.id,
        repositoryUrl: data.repositoryUrl,
      });

    return this.answerRepo.update({ id: answer.id, grade, status });
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
