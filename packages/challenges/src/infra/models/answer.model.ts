import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerStatus } from '@prisma/client';
import { UuidScalar } from '@core/scalars';

@ObjectType()
export class Answer {
  @Field(() => UuidScalar)
  id: string;

  @Field(() => UuidScalar)
  challengeId: string;

  @Field()
  repositoryUrl: string;

  @Field(() => AnswerStatus)
  status: AnswerStatus;

  @Field(() => Int)
  grade: number;

  @Field()
  createdAt: Date;
}
