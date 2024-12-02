import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infra/database/database.module';
import { CreateChallengeService } from './use-cases/create-challenge';
import { ListChallengesService } from './use-cases/list-challenges';
import { ChallengesResolver } from './challenges.resolver';
import { DeleteChallengeService } from './use-cases/delete-challenge';
import { UpdateChallengeService } from './use-cases/update-challenge';

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
