import { Inject, Injectable } from '@nestjs/common';
import {
  ANSWERS_REPOSITORY_TOKEN,
  AnswersRepository,
} from '../../repositories/answers';
import { ListAnswersDto } from '../dtos';

@Injectable()
export class ListAnswersService {
  constructor(
    @Inject(ANSWERS_REPOSITORY_TOKEN)
    private readonly answerRepo: AnswersRepository,
  ) {}

  async run({
    challengeId,
    status,
    answeredEndAt,
    answeredStartAt,
    limit,
    page,
  }: ListAnswersDto) {
    return this.answerRepo.listPaginated({
      queryFields: { challengeId, status, answeredEndAt, answeredStartAt },
      limit,
      page,
    });
  }
}
