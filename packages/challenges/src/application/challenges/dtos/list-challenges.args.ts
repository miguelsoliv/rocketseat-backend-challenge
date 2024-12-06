import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationArgs } from '../../common';

@ArgsType()
export class ListChallengesArgs extends PaginationArgs {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
