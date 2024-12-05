import { Module } from '@nestjs/common';
import { InfraModule } from '@infra/infra.module';
import { EventsHandlerModule } from '@infra/events-handler/events-handler.module';
import { AnswerChallengeService } from './use-cases/answer-challenge';
import { ListAnswersService } from './use-cases/list-answers';
import { AnswersResolver } from './answers.resolver';

@Module({
  imports: [InfraModule, EventsHandlerModule],
  providers: [AnswersResolver, AnswerChallengeService, ListAnswersService],
})
export class AnswersModule {}
