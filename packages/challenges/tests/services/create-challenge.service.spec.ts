import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { Challenge } from '@core/challenges/challenge.model';
import { CreateChallengeService } from '@core/challenges/services';
import { TitleAlreadyTaken } from '@core/challenges/errors';
import { CHALLENGES_REPOSITORY_TOKEN } from '@core/repositories/challenges';
import { ChallengesRepositoryFake } from '../fakes';
import { createFakeChallenges } from '../factories';

describe('CreateChallengeService', () => {
  let createService: CreateChallengeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateChallengeService,
        {
          provide: CHALLENGES_REPOSITORY_TOKEN,
          useClass: ChallengesRepositoryFake,
        },
      ],
    }).compile();

    createService = module.get(CreateChallengeService);
  });

  it('should throw when informed title is the same as another challenge', async () => {
    const [alreadyCreatedChallenge] = await createFakeChallenges(createService);

    await expect(
      createService.run({
        title: alreadyCreatedChallenge.title,
        description: faker.word.words(5),
      }),
    ).rejects.toThrow(TitleAlreadyTaken);
  });

  it('should be able to create a challenge and return it', async () => {
    const challengeData = {
      title: faker.word.words(2),
      description: faker.word.words(5),
    };

    const result = await createService.run(challengeData);

    expect(result).toStrictEqual<Challenge>({
      ...challengeData,
      id: expect.any(String),
      createdAt: expect.any(Date),
    });
  });
});
