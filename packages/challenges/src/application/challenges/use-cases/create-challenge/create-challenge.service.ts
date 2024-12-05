import { Inject, Injectable } from '@nestjs/common';
import {
  CHALLENGE_REPOSITORY_TOKEN,
  ChallengeRepository,
} from '@core/repositories/challenge.repository';
import { Challenge } from '@core/models';
import { TitleAlreadyTaken } from '../../errors';
import { CreateChallengeInput } from './create-challenge.input';

@Injectable()
export class CreateChallengeService {
  constructor(
    @Inject(CHALLENGE_REPOSITORY_TOKEN)
    private readonly challengeRepo: ChallengeRepository,
  ) {}

  async run(data: CreateChallengeInput): Promise<Challenge> {
    const isTitleTaken = await this.challengeRepo.findByTitle(data.title);

    if (isTitleTaken) throw new TitleAlreadyTaken();

    return this.challengeRepo.save(data);
  }
}
