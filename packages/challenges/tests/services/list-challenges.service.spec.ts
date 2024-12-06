import { Test } from '@nestjs/testing';
import { Challenge } from '@core/challenges/challenge.model';
import {
  CreateChallengeService,
  ListChallengesService,
} from '@core/challenges/services';
import { CHALLENGES_REPOSITORY_TOKEN } from '@core/repositories/challenges';
import { PaginationResponseDto } from '@shared/dtos';
import { ChallengesRepositoryFake } from '../fakes';
import { createFakeChallenges } from '../factories';

describe('ListChallengesService', () => {
  let createService: CreateChallengeService;
  let listService: ListChallengesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateChallengeService,
        ListChallengesService,
        {
          provide: CHALLENGES_REPOSITORY_TOKEN,
          useClass: ChallengesRepositoryFake,
        },
      ],
    }).compile();

    createService = module.get(CreateChallengeService);
    listService = module.get(ListChallengesService);
  });

  it('should return default values when no challenge is found', async () => {
    const result = await listService.run({});

    expect(result).toStrictEqual<PaginationResponseDto<Challenge>>({
      docs: [],
      hasNextPage: false,
      total: 0,
    });
  });

  it('should return found challenges with paginated props for title filter', async () => {
    const createdChallenges = 3;
    const [firstChallenge] = await createFakeChallenges(
      createService,
      createdChallenges,
    );

    const result = await listService.run({ title: firstChallenge.title });

    expect(result).toStrictEqual<PaginationResponseDto<Challenge>>({
      docs: [firstChallenge],
      hasNextPage: false,
      total: createdChallenges,
    });
  });

  it('should return found challenges with paginated props for description filter', async () => {
    const createdChallenges = 3;
    const [firstChallenge] = await createFakeChallenges(
      createService,
      createdChallenges,
    );

    const result = await listService.run({
      description: firstChallenge.description,
    });

    expect(result).toStrictEqual<PaginationResponseDto<Challenge>>({
      docs: [firstChallenge],
      hasNextPage: false,
      total: createdChallenges,
    });
  });
});
