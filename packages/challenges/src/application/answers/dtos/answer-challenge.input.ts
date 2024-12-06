import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { UuidScalar } from '@shared/scalars';

@InputType()
export class AnswerChallengeInput {
  @Field(() => UuidScalar)
  @IsNotEmpty()
  challengeId: string;

  @Field()
  @IsUrl()
  repositoryUrl: string;
}
