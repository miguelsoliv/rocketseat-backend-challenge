import { AnswerStatus } from '@shared/constants';

export class CorrectedAnswerEvent {
  grade: number;
  status: AnswerStatus;
}
