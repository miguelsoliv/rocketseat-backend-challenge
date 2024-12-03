import { ArgsType, Field, Int } from '@nestjs/graphql';
import { AnswerStatus } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { UuidScalar } from '@core/scalars';

@ArgsType()
export class ListAnswersArgs {
  @Field(() => UuidScalar)
  @IsNotEmpty()
  challengeId: string;

  @Field(() => AnswerStatus, { nullable: true })
  @IsEnum(AnswerStatus)
  @IsOptional()
  status?: AnswerStatus;

  @Field({ nullable: true, description: 'Min date to search for an answer' })
  @IsDate()
  @IsOptional()
  answeredStartAt?: Date;

  @Field({ nullable: true, description: 'Max date to search for an answer' })
  @IsDate()
  @IsOptional()
  answeredEndAt?: Date;

  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  @IsOptional()
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  @IsPositive()
  @IsOptional()
  limit: number;
}
