export class PaginationRequestDto<T> {
  queryFields: Partial<T>;
  page? = 1;
  limit? = 10;
}
