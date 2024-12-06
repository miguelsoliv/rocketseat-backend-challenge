import { PaginationRequestDto } from '@shared/dtos';

export class ListChallengesDto extends PaginationRequestDto {
  title?: string;
  description?: string;
}
