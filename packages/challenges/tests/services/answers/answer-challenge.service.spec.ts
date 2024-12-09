import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { vi } from 'vitest';
import {
  AnswerChallengeService,
  ListAnswersService,
} from '@core/answers/services';
import { Answer } from '@core/answers/answer.model';
import { InvalidRepositoryUrlError } from '@core/answers/errors';
import { CreateChallengeService } from '@core/challenges/services';
import { ANSWERS_REPOSITORY_TOKEN } from '@core/repositories/answers';
import { CHALLENGES_REPOSITORY_TOKEN } from '@core/repositories/challenges';
import { EVENTS_HANDLER_TOKEN } from '@core/events/events-handler';
import { ChallengeNotFound } from '@shared/errors';
import { AnswerStatus } from '@shared/constants';
import {
  AnswersRepositoryFake,
  ChallengesRepositoryFake,
  KafkaServiceFake,
} from '../../fakes';
import { createFakeChallenges } from '../../factories';

vi.mock('axios', () => ({
  default: {
    request: () => ({
      data: [{ name: 'valid-repo-name' }],
    }),
  },
}));

describe('AnswerChallengeService', () => {
  let answerChallengeService: AnswerChallengeService;
  let listAnswersService: ListAnswersService;
  let createChallengeService: CreateChallengeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AnswerChallengeService,
        ListAnswersService,
        CreateChallengeService,
        {
          provide: EVENTS_HANDLER_TOKEN,
          useClass: KafkaServiceFake,
        },
        {
          provide: ANSWERS_REPOSITORY_TOKEN,
          useClass: AnswersRepositoryFake,
        },
        {
          provide: CHALLENGES_REPOSITORY_TOKEN,
          useClass: ChallengesRepositoryFake,
        },
      ],
    }).compile();

    answerChallengeService = module.get(AnswerChallengeService);
    listAnswersService = module.get(ListAnswersService);
    createChallengeService = module.get(CreateChallengeService);
  });

  it('should throw when no challenge is found for informed challengeId and save answer with error status', async () => {
    await expect(
      answerChallengeService.run({
        challengeId: 'invalid-challenge-id',
        repositoryUrl: faker.internet.url(),
      }),
    ).rejects.toThrow(ChallengeNotFound);

    const savedAnswers = await listAnswersService.run({});

    expect(savedAnswers.docs).toStrictEqual<Answer[]>([
      {
        id: expect.any(String),
        grade: 0,
        status: AnswerStatus.Error,
        createdAt: expect.any(Date),
        challengeId: undefined,
        repositoryUrl: undefined,
      },
    ]);
  });

  it.each([
    'https://github.com/',
    'https://github.com/valid-user/',
    'https://github.com//valid-repo',
    'https://github.com/valid-user/non-existing-repo',
  ])(
    'should throw when repositoryUrl is not a valid Github repository URL and save answer with error status',
    async (repoUrl) => {
      const [createdChallenge] = await createFakeChallenges(
        createChallengeService,
      );

      await expect(
        answerChallengeService.run({
          challengeId: createdChallenge.id,
          repositoryUrl: repoUrl,
        }),
      ).rejects.toThrow(InvalidRepositoryUrlError);

      const savedAnswers = await listAnswersService.run({});

      expect(savedAnswers.docs).toStrictEqual<Answer[]>([
        {
          id: expect.any(String),
          grade: 0,
          status: AnswerStatus.Error,
          createdAt: expect.any(Date),
          challengeId: undefined,
          repositoryUrl: undefined,
        },
      ]);
    },
  );

  it('should be able to create an answer and return it', async () => {
    const [createdChallenge] = await createFakeChallenges(
      createChallengeService,
    );

    const answerData = {
      challengeId: createdChallenge.id,
      repositoryUrl: 'https://github.com/users/valid-repo-name',
    };

    const result = await answerChallengeService.run(answerData);

    expect(result).toStrictEqual<Answer>({
      ...answerData,
      id: expect.any(String),
      grade: result.grade,
      status: AnswerStatus.Done,
      createdAt: expect.any(Date),
    });
  });
});
