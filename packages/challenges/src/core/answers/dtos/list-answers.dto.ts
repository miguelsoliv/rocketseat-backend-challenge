import { AnswerStatus } from '@shared/constants';
import { PaginationRequestDto } from '@shared/dtos';

export class ListAnswersDto extends PaginationRequestDto {
  challengeId?: string;
  status?: AnswerStatus;
  answeredStartAt?: Date;
  answeredEndAt?: Date;
}
