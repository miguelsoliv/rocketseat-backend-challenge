import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import {
  CreateChallengeService,
  ListChallengesService,
  DeleteChallengeService,
  UpdateChallengeService,
} from '@core/challenges/services';
import { ChallengesResolver } from './challenges.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [
    ChallengesResolver,
    CreateChallengeService,
    DeleteChallengeService,
    UpdateChallengeService,
    ListChallengesService,
  ],
})
export class ChallengesModule {}
