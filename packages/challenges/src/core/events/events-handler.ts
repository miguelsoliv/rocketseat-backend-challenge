import { ChallengeAnsweredEvent } from './challenge-answered.event';
import { CorrectedAnswerEvent } from './corrected-answer.event';

export abstract class EventsHandler {
  abstract triggerChallengeAnsweredEvent(
    data: ChallengeAnsweredEvent,
  ): Promise<CorrectedAnswerEvent>;
}
