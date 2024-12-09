import { Module } from '@nestjs/common';
import { CHALLENGES_REPOSITORY_TOKEN } from '@core/repositories/challenges';
import { ANSWERS_REPOSITORY_TOKEN } from '@core/repositories/answers';
import {
  AnswersRepositoryPrisma,
  ChallengesRepositoryPrisma,
} from './repositories';
import { PaginateQueryService } from './services/paginate-query.service';
import { PrismaService } from './services/prisma.service';

const repoClasses = [
  {
    provide: CHALLENGES_REPOSITORY_TOKEN,
    useClass: ChallengesRepositoryPrisma,
  },
  {
    provide: ANSWERS_REPOSITORY_TOKEN,
    useClass: AnswersRepositoryPrisma,
  },
];

@Module({
  providers: [PrismaService, PaginateQueryService, ...repoClasses],
  exports: [PaginateQueryService, ...repoClasses],
})
export class DatabaseModule {}
