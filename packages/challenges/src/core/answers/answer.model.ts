import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerStatus } from '@shared/constants';
import { UuidScalar } from '@shared/scalars';

@ObjectType()
export class Answer {
  @Field(() => UuidScalar)
  id: string;

  @Field(() => UuidScalar, { nullable: true })
  challengeId?: string;

  @Field({ nullable: true })
  repositoryUrl?: string;

  @Field(() => AnswerStatus)
  status: AnswerStatus;

  @Field(() => Int)
  grade: number;

  @Field()
  createdAt: Date;
}
