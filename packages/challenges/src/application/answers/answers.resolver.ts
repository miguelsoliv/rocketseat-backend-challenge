import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Answer } from '@core/answers/answer.model';
import {
  AnswerChallengeService,
  ListAnswersService,
} from '@core/answers/services';
import {
  AnswerChallengeInput,
  ListAnswersArgs,
  ListAnswersResponse,
} from './dtos';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(
    private readonly answerChallengeService: AnswerChallengeService,
    private readonly listAnswersService: ListAnswersService,
  ) {}

  @Mutation(() => Answer)
  async answerChallenge(
    @Args('data') data: AnswerChallengeInput,
  ): Promise<Answer> {
    return this.answerChallengeService.run(data);
  }

  @Query(() => ListAnswersResponse)
  async answers(@Args() data: ListAnswersArgs): Promise<ListAnswersResponse> {
    return this.listAnswersService.run(data);
  }
}
