import { Field, Int, ObjectType } from '@nestjs/graphql';
// TODO: core dep
import { UuidScalar } from '@core/scalars';
import { AnswerStatus } from '@shared/constants';

@ObjectType()
export class Answer {
  @Field(() => UuidScalar)
  id: string;

  @Field(() => UuidScalar)
  challengeId?: string;

  @Field()
  repositoryUrl?: string;

  @Field(() => AnswerStatus)
  status: AnswerStatus;

  @Field(() => Int)
  grade: number;

  @Field()
  createdAt: Date;
}
