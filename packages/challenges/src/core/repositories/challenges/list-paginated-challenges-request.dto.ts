import { Challenge } from '@core/challenges/challenge.model';
import { PaginationRequestDto } from '@shared/dtos';

type ChallengesFilters = Pick<Challenge, 'description' | 'title'>;

export class ListPaginatedChallengesRequestDto extends PaginationRequestDto {
  queryFields: Partial<ChallengesFilters>;
}
