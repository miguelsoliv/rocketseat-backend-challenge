import { ChallengeAnsweredEvent } from './challenge-answered.event';
import { CorrectedAnswerEvent } from './corrected-answer.event';

export const EVENTS_HANDLER_TOKEN = 'EVENTS_HANDLER';

export abstract class EventsHandler {
  abstract triggerChallengeAnsweredEvent(
    data: ChallengeAnsweredEvent,
  ): Promise<CorrectedAnswerEvent>;
}
