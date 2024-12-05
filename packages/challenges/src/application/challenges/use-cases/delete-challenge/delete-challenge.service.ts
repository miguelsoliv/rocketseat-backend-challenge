import { Inject, Injectable } from '@nestjs/common';
import { ChallengeNotFound } from '@shared/errors';
import {
  CHALLENGE_REPOSITORY_TOKEN,
  ChallengeRepository,
} from '@core/repositories/challenge.repository';
import { Challenge } from '@core/models';

@Injectable()
export class DeleteChallengeService {
  constructor(
    @Inject(CHALLENGE_REPOSITORY_TOKEN)
    private readonly challengeRepo: ChallengeRepository,
  ) {}

  async run(id: string): Promise<Challenge> {
    const challenge = await this.challengeRepo.findById(id);

    if (!challenge) throw new ChallengeNotFound();

    return this.challengeRepo.delete(id);
  }
}
