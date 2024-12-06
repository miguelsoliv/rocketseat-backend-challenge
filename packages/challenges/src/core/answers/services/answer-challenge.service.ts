import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { AnswerStatus } from '@shared/constants';
import { ChallengeNotFound } from '@shared/errors';
import { KafkaService } from '@infra/events-handler/kafka.service';
import {
  ANSWERS_REPOSITORY_TOKEN,
  AnswersRepository,
} from '../../repositories/answers';
import {
  CHALLENGES_REPOSITORY_TOKEN,
  ChallengesRepository,
} from '../../repositories/challenges';
import { InvalidRepositoryUrlError } from '../errors';
import { AnswerChallengeDto } from '../dtos';

@Injectable()
export class AnswerChallengeService {
  constructor(
    private readonly kafkaService: KafkaService,
    @Inject(ANSWERS_REPOSITORY_TOKEN)
    private readonly answersRepo: AnswersRepository,
    @Inject(CHALLENGES_REPOSITORY_TOKEN)
    private readonly challengesRepo: ChallengesRepository,
  ) {}

  async run(data: AnswerChallengeDto) {
    const challenge = await this.challengesRepo.findById(data.challengeId);

    const isValidRepoUrl = await this.checkForValidGithubUrl(
      data.repositoryUrl,
    );

    if (!challenge || !isValidRepoUrl) {
      await this.answersRepo.save({ grade: 0, status: AnswerStatus.Error });

      throw challenge
        ? new InvalidRepositoryUrlError()
        : new ChallengeNotFound();
    }

    const answer = await this.answersRepo.save({
      grade: 0,
      status: AnswerStatus.Pending,
      repositoryUrl: data.repositoryUrl,
      challengeId: data.challengeId,
    });

    const { grade, status } =
      await this.kafkaService.triggerChallengeAnsweredEvent({
        submissionId: answer.id,
        repositoryUrl: data.repositoryUrl,
      });

    return this.answersRepo.update({ id: answer.id, grade, status });
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
