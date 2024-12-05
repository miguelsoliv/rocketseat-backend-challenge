import { Module } from '@nestjs/common';
import { InfraModule } from '@infra/infra.module';
import { CreateChallengeService } from './use-cases/create-challenge';
import { ListChallengesService } from './use-cases/list-challenges';
import { DeleteChallengeService } from './use-cases/delete-challenge';
import { UpdateChallengeService } from './use-cases/update-challenge';
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
