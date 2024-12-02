import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infra/database/database.module';
import { CreateChallengeService } from './use-cases/create-challenge';
import { ListChallengesService } from './use-cases/list-challenges';
import { ChallengesResolver } from './challenges.resolver';
import { DeleteChallengeService } from './use-cases/delete-challenge';

@Module({
  imports: [DatabaseModule],
  providers: [
    ChallengesResolver,
    CreateChallengeService,
    DeleteChallengeService,
    ListChallengesService,
  ],
})
export class ChallengesModule {}
