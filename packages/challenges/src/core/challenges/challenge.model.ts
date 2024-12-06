import { Field, ObjectType } from '@nestjs/graphql';
import { UuidScalar } from '@shared/scalars';

@ObjectType()
export class Challenge {
  @Field(() => UuidScalar)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;
}
