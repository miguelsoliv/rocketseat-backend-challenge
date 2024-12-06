import { Test } from '@nestjs/testing';
import { Challenge } from '@core/challenges/challenge.model';
import {
  CreateChallengeService,
  DeleteChallengeService,
} from '@core/challenges/services';
import { CHALLENGES_REPOSITORY_TOKEN } from '@core/repositories/challenges';
import { ChallengeNotFound } from '@shared/errors';
import { ChallengesRepositoryFake } from '../fakes';
import { createFakeChallenges } from '../factories';

describe('DeleteChallengeService', () => {
  let createService: CreateChallengeService;
  let deleteService: DeleteChallengeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateChallengeService,
        DeleteChallengeService,
        {
          provide: CHALLENGES_REPOSITORY_TOKEN,
          useClass: ChallengesRepositoryFake,
        },
      ],
    }).compile();

    createService = module.get(CreateChallengeService);
    deleteService = module.get(DeleteChallengeService);
  });

  it('should throw when no challenge is found for informed id', async () => {
    await expect(deleteService.run('invalid-challenge-id')).rejects.toThrow(
      ChallengeNotFound,
    );
  });

  it('should be able to delete a challenge and return it', async () => {
    const [challengeToDelete] = await createFakeChallenges(createService);

    const result = await deleteService.run(challengeToDelete.id);

    expect(result).toStrictEqual<Challenge>(challengeToDelete);
  });
});
