import { Inject, Injectable } from '@nestjs/common';
import {
  ChallengesRepository,
  CHALLENGES_REPOSITORY_TOKEN,
} from '../../repositories/challenges';
import { ListChallengesDto } from '../dtos';

@Injectable()
export class ListChallengesService {
  constructor(
    @Inject(CHALLENGES_REPOSITORY_TOKEN)
    private readonly challengesRepo: ChallengesRepository,
  ) {}

  async run({ description, limit, page, title }: ListChallengesDto) {
    return this.challengesRepo.listPaginated({
      queryFields: { description, title },
      limit,
      page,
    });
  }
}
