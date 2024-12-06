import { Inject, Injectable } from '@nestjs/common';
import { ChallengeNotFound } from '@shared/errors';
import {
  CHALLENGES_REPOSITORY_TOKEN,
  ChallengesRepository,
} from '../../repositories/challenges';
import { UpdateChallengeDto } from '../dtos';
import { TitleAlreadyTaken } from '../errors';

@Injectable()
export class UpdateChallengeService {
  constructor(
    @Inject(CHALLENGES_REPOSITORY_TOKEN)
    private readonly challengesRepo: ChallengesRepository,
  ) {}

  async run(data: UpdateChallengeDto) {
    const challengeToUpdate = await this.challengesRepo.findById(data.id);

    if (!challengeToUpdate) throw new ChallengeNotFound();

    const isTitleAvailable = await this.challengesRepo.findByTitle(data.title);

    if (isTitleAvailable && isTitleAvailable.id !== data.id) {
      throw new TitleAlreadyTaken();
    }

    return this.challengesRepo.update(data);
  }
}
