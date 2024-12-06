import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export interface PaginatedData<T> {
  docs: T[];
  total: number;
  hasNextPage: boolean;
}

export function PaginationResponse<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponse implements PaginatedData<T> {
    @Field(() => [classRef])
    docs: T[];

    @Field(() => Int)
    total: number;

    @Field()
    hasNextPage: boolean;
  }

  return PaginatedResponse as Type<PaginatedData<T>>;
}
