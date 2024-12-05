import { Inject, Injectable } from '@nestjs/common';
import {
  ANSWER_REPOSITORY_TOKEN,
  AnswerRepository,
} from '@core/repositories/answer.repository';
import { ListAnswersArgs } from './list-answers.args';

@Injectable()
export class ListAnswersService {
  constructor(
    @Inject(ANSWER_REPOSITORY_TOKEN)
    private readonly answerRepo: AnswerRepository,
  ) {}

  async run({ challengeId, status, limit, page }: ListAnswersArgs) {
    return this.answerRepo.listPaginated({
      queryFields: { challengeId, status },
      limit,
      page,
    });
  }
}
