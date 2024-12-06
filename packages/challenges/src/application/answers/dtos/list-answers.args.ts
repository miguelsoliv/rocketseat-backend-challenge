import { ArgsType, Field } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UuidScalar } from '@shared/scalars';
import { AnswerStatus } from '@shared/constants';
import { PaginationArgs } from '../../common';

@ArgsType()
export class ListAnswersArgs extends PaginationArgs {
  @Field(() => UuidScalar, { nullable: true })
  @IsNotEmpty()
  @IsOptional()
  challengeId?: string;

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
}
