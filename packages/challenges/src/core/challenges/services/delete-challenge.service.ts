import { Inject, Injectable } from '@nestjs/common';
import { ChallengeNotFound } from '@shared/errors';
import {
  CHALLENGES_REPOSITORY_TOKEN,
  ChallengesRepository,
} from '../../repositories/challenges';

@Injectable()
export class DeleteChallengeService {
  constructor(
    @Inject(CHALLENGES_REPOSITORY_TOKEN)
    private readonly challengesRepo: ChallengesRepository,
  ) {}

  async run(id: string) {
    const challenge = await this.challengesRepo.findById(id);

    if (!challenge) throw new ChallengeNotFound();

    return this.challengesRepo.delete(id);
  }
}
