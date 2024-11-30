import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Challenge } from './challenges.model';
import { ChallengesService } from './challenges.service';
import { CreateChallengeInput } from './dtos';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(private readonly challengesServices: ChallengesService) {}

  @Mutation(() => Challenge)
  async createChallenge(
    @Args('createChallengeData') createChallengeData: CreateChallengeInput,
  ) {
    return this.challengesServices.create(createChallengeData);
  }
}
