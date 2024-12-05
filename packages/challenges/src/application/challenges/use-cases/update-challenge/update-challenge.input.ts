import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UuidScalar } from '@shared/scalars';

@InputType()
export class UpdateChallengeInput {
  @Field(() => UuidScalar)
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
