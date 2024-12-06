import { Inject, Injectable } from '@nestjs/common';
import {
  CHALLENGES_REPOSITORY_TOKEN,
  ChallengesRepository,
} from '../../repositories/challenges';
import { CreateChallengeDto } from '../dtos';
import { TitleAlreadyTaken } from '../errors';

@Injectable()
export class CreateChallengeService {
  constructor(
    @Inject(CHALLENGES_REPOSITORY_TOKEN)
    private readonly challengesRepo: ChallengesRepository,
  ) {}

  async run(data: CreateChallengeDto) {
    const isTitleTaken = await this.challengesRepo.findByTitle(data.title);

    if (isTitleTaken) throw new TitleAlreadyTaken();

    return this.challengesRepo.save(data);
  }
}
