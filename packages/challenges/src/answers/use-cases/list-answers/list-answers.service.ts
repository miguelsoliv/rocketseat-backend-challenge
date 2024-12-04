import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ListAnswersArgs } from './list-answers.args';
import { PaginateQueryService } from '../../../shared/services';

@Injectable()
export class ListAnswersService {
  constructor(private readonly paginateQueryService: PaginateQueryService) {}

  async run({ challengeId, status, limit, page }: ListAnswersArgs) {
    const query: Prisma.AnswerWhereInput = {};

    if (challengeId) this.attachToQuery(query, { challengeId });
    if (status) this.attachToQuery(query, { status });

    return this.paginateQueryService.run({
      query,
      model: 'answer',
      limit,
      page,
    });
  }

  private attachToQuery(
    query: Prisma.AnswerWhereInput,
    clause: Prisma.AnswerWhereInput,
  ) {
    Object.assign(query, clause);
  }
}
