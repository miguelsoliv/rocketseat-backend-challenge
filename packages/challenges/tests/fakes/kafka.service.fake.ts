import { EventsHandler } from '@core/events/events-handler';
import { AnswerStatus } from '@shared/constants';

export class KafkaServiceFake implements EventsHandler {
  async triggerChallengeAnsweredEvent() {
    return {
      grade: Math.floor(Math.random() * 10) + 1,
      status: AnswerStatus.Done,
    };
  }
}
