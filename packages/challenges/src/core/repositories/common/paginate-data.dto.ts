import { PaginationRequestDto } from '@shared/dtos';

export class PaginateDataDto<T> extends PaginationRequestDto {
  queryFields: Partial<T>;
}
