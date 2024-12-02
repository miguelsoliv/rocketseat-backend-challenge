import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UuidScalar } from '@core/scalars';
import { Challenge } from '@infra/models';
import {
  CreateChallengeInput,
  CreateChallengeService,
} from './use-cases/create-challenge';
import {
  ListChallengesArgs,
  ListChallengesService,
} from './use-cases/list-challenges';
import { DeleteChallengeService } from './use-cases/delete-challenge';
import {
  UpdateChallengeInput,
  UpdateChallengeService,
} from './use-cases/update-challenge';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(
    private readonly createChallengeService: CreateChallengeService,
    private readonly deleteChallengeService: DeleteChallengeService,
    private readonly updateChallengesService: UpdateChallengeService,
    private readonly listChallengesService: ListChallengesService,
  ) {}

  @Mutation(() => Challenge)
  async createChallenge(@Args('data') data: CreateChallengeInput) {
    return this.createChallengeService.run(data);
  }

  @Mutation(() => Challenge)
  async deleteChallenge(@Args('id', { type: () => UuidScalar }) id: string) {
    return this.deleteChallengeService.run(id);
  }

  @Mutation(() => Challenge)
  async updateChallenge(@Args('data') data: UpdateChallengeInput) {
    return this.updateChallengesService.run(data);
  }

  @Query(() => [Challenge])
  async challenges(@Args() listChallengesData: ListChallengesArgs) {
    return this.listChallengesService.run(listChallengesData);
  }
}
