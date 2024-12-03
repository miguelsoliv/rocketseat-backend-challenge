import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Answer } from '@infra/models';
import {
  AnswerChallengeInput,
  AnswerChallengeService,
} from './use-cases/answer-challenge';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(
    private readonly answerChallengeService: AnswerChallengeService,
  ) {}

  @Mutation(() => Answer)
  async answerChallenge(@Args('data') data: AnswerChallengeInput) {
    return this.answerChallengeService.run(data);
  }
}
