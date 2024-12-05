import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Answer } from '@core/models';
import {
  AnswerChallengeInput,
  AnswerChallengeService,
} from './use-cases/answer-challenge';
import {
  ListAnswersArgs,
  ListAnswersService,
  ListAnswersResponse,
} from './use-cases/list-answers';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(
    private readonly answerChallengeService: AnswerChallengeService,
    private readonly listAnswersService: ListAnswersService,
  ) {}

  @Mutation(() => Answer)
  async answerChallenge(@Args('data') data: AnswerChallengeInput) {
    return this.answerChallengeService.run(data);
  }

  @Query(() => ListAnswersResponse)
  async answers(@Args() data: ListAnswersArgs) {
    return this.listAnswersService.run(data);
  }
}
