import { Answer } from '@core/answers/answer.model';
import { PaginationRequestDto } from '@shared/dtos';

type AnswersFilters = Pick<Answer, 'challengeId' | 'status'>;

interface AnsweredDateRange {
  answeredEndAt?: Date;
  answeredStartAt?: Date;
}

export class ListPaginatedAnswersRequestDto extends PaginationRequestDto {
  queryFields: Partial<AnswersFilters> & AnsweredDateRange;
}
