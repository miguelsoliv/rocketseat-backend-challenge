import { Module } from '@nestjs/common';
import { CHALLENGE_REPOSITORY_TOKEN } from '@core/repositories/challenge.repository';
import { ANSWER_REPOSITORY_TOKEN } from '@core/repositories/answer.repository';
import { ChallengeRepositoryPrisma } from './repositories/challenge-repository.prisma';
import { AnswerRepositoryPrisma } from './repositories/answer-repository.prisma';
import { PaginateQueryService } from './services/paginate-query.service';
import { PrismaService } from './services/prisma.service';

const repoClasses = [
  {
    provide: CHALLENGE_REPOSITORY_TOKEN,
    useClass: ChallengeRepositoryPrisma,
  },
  {
    provide: ANSWER_REPOSITORY_TOKEN,
    useClass: AnswerRepositoryPrisma,
  },
];

@Module({
  providers: [PrismaService, PaginateQueryService, ...repoClasses],
  exports: [PaginateQueryService, ...repoClasses],
})
export class InfraModule {}
