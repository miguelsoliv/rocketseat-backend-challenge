import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infra/database/database.module';
import { CreateChallengeService } from './use-cases/create-challenge';
import { ChallengesResolver } from './challenges.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [ChallengesResolver, CreateChallengeService],
})
export class ChallengesModule {}
