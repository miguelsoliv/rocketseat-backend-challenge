import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginateQueryService } from '@core/services';
import { ListChallengesArgs } from './list-challenges.args';

@Injectable()
export class ListChallengesService {
  constructor(private readonly paginateQueryService: PaginateQueryService) {}

  async run({ description, limit, page, title }: ListChallengesArgs) {
    const query: Prisma.ChallengeWhereInput = {};

    if (title) {
      this.attachToQuery(query, { title: { contains: title } });
    }
    if (description) {
      this.attachToQuery(query, { description: { contains: description } });
    }

    return this.paginateQueryService.run({
      query,
      model: 'challenge',
      limit,
      page,
    });
  }

  private attachToQuery(
    query: Prisma.ChallengeWhereInput,
    clause: Prisma.ChallengeWhereInput,
  ) {
    Object.assign(query, clause);
  }
}
