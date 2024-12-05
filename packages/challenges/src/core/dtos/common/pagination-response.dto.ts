export class PaginationResponseDto<T> {
  docs: T[];
  total: number;
  hasNextPage: boolean;
}
