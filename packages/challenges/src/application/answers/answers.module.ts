import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { EventsHandlerModule } from '@infra/events-handler/events-handler.module';
import {
  AnswerChallengeService,
  ListAnswersService,
} from '@core/answers/services';
import { AnswersResolver } from './answers.resolver';

@Module({
  imports: [DatabaseModule, EventsHandlerModule],
  providers: [AnswersResolver, AnswerChallengeService, ListAnswersService],
})
export class AnswersModule {}
