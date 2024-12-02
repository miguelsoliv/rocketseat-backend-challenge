import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Challenge } from '../infra/models';
import {
  CreateChallengeInput,
  CreateChallengeService,
} from './use-cases/create-challenge';
import {
  ListChallengesArgs,
  ListChallengesService,
} from './use-cases/list-challenges';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(
    private readonly createChallengeService: CreateChallengeService,
    private readonly listChallengesService: ListChallengesService,
  ) {}

  @Mutation(() => Challenge)
  async createChallenge(
    @Args('createChallengeData') createChallengeData: CreateChallengeInput,
  ) {
    return this.createChallengeService.run(createChallengeData);
  }

  @Query(() => [Challenge])
  async challenges(@Args() listChallengesData: ListChallengesArgs) {
    return this.listChallengesService.run(listChallengesData);
  }
}
