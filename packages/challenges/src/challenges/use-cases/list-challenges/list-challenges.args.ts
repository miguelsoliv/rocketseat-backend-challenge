import { Optional } from '@nestjs/common';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

// TODO: add pagination props
@ArgsType()
export class ListChallengesArgs {
  @Field({ nullable: true })
  @IsNotEmpty()
  @Optional()
  title?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @Optional()
  description?: string;
}
