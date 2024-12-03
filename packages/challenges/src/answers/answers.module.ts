import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { AnswersResolver } from './answers.resolver';
import { AnswerChallengeService } from './use-cases/answer-challenge';

@Module({
  imports: [DatabaseModule],
  providers: [AnswersResolver, AnswerChallengeService],
})
export class AnswersModule {}
