import { Inject, Injectable } from '@nestjs/common';
import {
  ChallengeRepository,
  CHALLENGE_REPOSITORY_TOKEN,
} from '@core/repositories/challenge.repository';
import { ListChallengesArgs } from './list-challenges.args';
import { ListChallengesResponse } from './list-challenges.response';

@Injectable()
export class ListChallengesService {
  constructor(
    @Inject(CHALLENGE_REPOSITORY_TOKEN)
    private readonly challengeRepo: ChallengeRepository,
  ) {}

  async run({
    description,
    limit,
    page,
    title,
  }: ListChallengesArgs): Promise<ListChallengesResponse> {
    return this.challengeRepo.listPaginated({
      queryFields: { description, title },
      limit,
      page,
    });
  }
}
