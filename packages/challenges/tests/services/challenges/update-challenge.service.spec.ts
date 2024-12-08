import { Test } from '@nestjs/testing';
import { Challenge } from '@core/challenges/challenge.model';
import {
  CreateChallengeService,
  UpdateChallengeService,
} from '@core/challenges/services';
import { CHALLENGES_REPOSITORY_TOKEN } from '@core/repositories/challenges';
import { ChallengeNotFound } from '@shared/errors';
import { ChallengesRepositoryFake } from '../../fakes';
import { createFakeChallenges } from '../../factories';

describe('UpdateChallengeService', () => {
  let createService: CreateChallengeService;
  let updateService: UpdateChallengeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateChallengeService,
        UpdateChallengeService,
        {
          provide: CHALLENGES_REPOSITORY_TOKEN,
          useClass: ChallengesRepositoryFake,
        },
      ],
    }).compile();

    createService = module.get(CreateChallengeService);
    updateService = module.get(UpdateChallengeService);
  });

  it('should throw when no challenge is found for informed id', async () => {
    await expect(
      updateService.run({ id: 'invalid-challenge-id' }),
    ).rejects.toThrow(ChallengeNotFound);
  });

  it('should be able to update a challenge with informed fields and return it', async () => {
    const [challengeToUpdate] = await createFakeChallenges(createService);

    const result = await updateService.run({
      id: challengeToUpdate.id,
      title: `#Updated - ${challengeToUpdate.title}`,
    });

    expect(result).toStrictEqual<Challenge>({
      ...challengeToUpdate,
      title: `#Updated - ${challengeToUpdate.title}`,
    });
  });
});
