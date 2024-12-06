import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UuidScalar } from '@shared/scalars';
import { Challenge } from '@core/challenges/challenge.model';
import {
  CreateChallengeService,
  DeleteChallengeService,
  ListChallengesService,
  UpdateChallengeService,
} from '@core/challenges/services';
import {
  CreateChallengeInput,
  ListChallengesArgs,
  ListChallengesResponse,
  UpdateChallengeInput,
} from './dtos';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(
    private readonly createChallengeService: CreateChallengeService,
    private readonly deleteChallengeService: DeleteChallengeService,
    private readonly updateChallengesService: UpdateChallengeService,
    private readonly listChallengesService: ListChallengesService,
  ) {}

  @Mutation(() => Challenge)
  async createChallenge(
    @Args('data') data: CreateChallengeInput,
  ): Promise<Challenge> {
    return this.createChallengeService.run(data);
  }

  @Mutation(() => Challenge)
  async deleteChallenge(
    @Args('id', { type: () => UuidScalar }) id: string,
  ): Promise<Challenge> {
    return this.deleteChallengeService.run(id);
  }

  @Mutation(() => Challenge)
  async updateChallenge(
    @Args('data') data: UpdateChallengeInput,
  ): Promise<Challenge> {
    return this.updateChallengesService.run(data);
  }

  @Query(() => ListChallengesResponse)
  async challenges(
    @Args() data: ListChallengesArgs,
  ): Promise<ListChallengesResponse> {
    return this.listChallengesService.run(data);
  }
}
