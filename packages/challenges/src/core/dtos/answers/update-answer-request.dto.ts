import { AnswerStatus } from '@shared/constants';

export class UpdateAnswerRequestDto {
  id: string;
  grade: number;
  status: AnswerStatus;
}
