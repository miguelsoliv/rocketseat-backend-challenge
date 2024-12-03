import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { AnswersResolver } from './answers.resolver';
import { AnswerChallengeService } from './use-cases/answer-challenge';
import { ListAnswersService } from './use-cases/list-answers';

@Module({
  imports: [DatabaseModule],
  providers: [AnswersResolver, AnswerChallengeService, ListAnswersService],
})
export class AnswersModule {}
