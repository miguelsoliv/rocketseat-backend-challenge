import { Field, ObjectType } from '@nestjs/graphql';
// TODO: core dep
import { UuidScalar } from '@core/scalars';

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
