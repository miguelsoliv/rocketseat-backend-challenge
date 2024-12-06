import { AnswerStatus } from '@shared/constants';

export class CreateAnswerRequestDto {
  grade: number;
  status: AnswerStatus;
  challengeId?: string;
  repositoryUrl?: string;
}
