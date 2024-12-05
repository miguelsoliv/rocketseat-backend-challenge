import { Inject, Injectable } from '@nestjs/common';
import { ChallengeNotFound } from '@shared/errors';
import {
  CHALLENGE_REPOSITORY_TOKEN,
  ChallengeRepository,
} from '@core/repositories/challenge.repository';
import { Challenge } from '@core/models';
import { TitleAlreadyTaken } from '../../errors';
import { UpdateChallengeInput } from './update-challenge.input';

@Injectable()
export class UpdateChallengeService {
  constructor(
    @Inject(CHALLENGE_REPOSITORY_TOKEN)
    private readonly challengeRepo: ChallengeRepository,
  ) {}

  async run(data: UpdateChallengeInput): Promise<Challenge> {
    const challengeToUpdate = await this.challengeRepo.findById(data.id);

    if (!challengeToUpdate) throw new ChallengeNotFound();

    const isTitleAvailable = await this.challengeRepo.findByTitle(data.title);

    if (isTitleAvailable && isTitleAvailable.id !== data.id) {
      throw new TitleAlreadyTaken();
    }

    return this.challengeRepo.update(data);
  }
}
