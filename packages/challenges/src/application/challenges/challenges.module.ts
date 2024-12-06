import { Module } from '@nestjs/common';
import { InfraModule } from '@infra/infra.module';
import {
  CreateChallengeService,
  ListChallengesService,
  DeleteChallengeService,
  UpdateChallengeService,
} from '@core/challenges/services';
import { ChallengesResolver } from './challenges.resolver';

@Module({
  imports: [InfraModule],
  providers: [
    ChallengesResolver,
    CreateChallengeService,
    DeleteChallengeService,
    UpdateChallengeService,
    ListChallengesService,
  ],
})
export class ChallengesModule {}
