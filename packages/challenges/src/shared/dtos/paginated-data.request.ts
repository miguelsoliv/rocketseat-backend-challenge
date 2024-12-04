import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsPositive } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  @IsOptional()
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  @IsPositive()
  @IsOptional()
  limit: number;
}
