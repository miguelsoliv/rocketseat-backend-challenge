import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Challenge } from '../infra/models';
import {
  CreateChallengeInput,
  CreateChallengeService,
} from './use-cases/create-challenge';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(
    private readonly createChallengeService: CreateChallengeService,
  ) {}

  @Mutation(() => Challenge)
  async createChallenge(
    @Args('createChallengeData') createChallengeData: CreateChallengeInput,
  ) {
    return this.createChallengeService.run(createChallengeData);
  }
}
