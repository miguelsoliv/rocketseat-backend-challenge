import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@infra/database/prisma.service';
import { ListAnswersArgs } from './list-answers.args';

@Injectable()
export class ListAnswersService {
  constructor(private readonly prismaService: PrismaService) {}

  async run({ challengeId, status, limit, page }: ListAnswersArgs) {
    const query: Prisma.AnswerWhereInput = { challengeId };

    if (status) this.attachToQuery(query, { status });

    return this.prismaService.answer.findMany({
      where: query,
      skip: limit * (page - 1),
      take: limit,
    });
  }

  private attachToQuery(
    query: Prisma.AnswerWhereInput,
    clause: Prisma.AnswerWhereInput,
  ) {
    Object.assign(query, clause);
  }
}
