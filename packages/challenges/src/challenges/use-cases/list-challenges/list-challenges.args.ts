import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

@ArgsType()
export class ListChallengesArgs {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  @IsOptional()
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  @IsPositive()
  @IsOptional()
  limit: number;
}
