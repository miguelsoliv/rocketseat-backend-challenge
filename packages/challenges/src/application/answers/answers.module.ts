import { Module } from '@nestjs/common';
import { InfraModule } from '@infra/infra.module';
import { EventsHandlerModule } from '@infra/events-handler/events-handler.module';
import {
  AnswerChallengeService,
  ListAnswersService,
} from '@core/answers/services';
import { AnswersResolver } from './answers.resolver';

@Module({
  imports: [InfraModule, EventsHandlerModule],
  providers: [AnswersResolver, AnswerChallengeService, ListAnswersService],
})
export class AnswersModule {}
