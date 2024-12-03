import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Answer } from '@infra/models';
import {
  AnswerChallengeInput,
  AnswerChallengeService,
} from './use-cases/answer-challenge';
import { ListAnswersArgs, ListAnswersService } from './use-cases/list-answers';

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

  @Query(() => [Answer])
  async answers(@Args() data: ListAnswersArgs) {
    return this.listAnswersService.run(data);
  }
}
