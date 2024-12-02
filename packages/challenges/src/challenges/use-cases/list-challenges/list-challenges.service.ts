import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@infra/database/prisma.service';
import { ListChallengesArgs } from './list-challenges.args';

@Injectable()
export class ListChallengesService {
  constructor(private readonly prismaService: PrismaService) {}

  async run({ description, limit, page, title }: ListChallengesArgs) {
    const query: Prisma.ChallengeWhereInput = {};

    if (title) {
      this.attachToQuery(query, { title: { contains: title } });
    }
    if (description) {
      this.attachToQuery(query, { description: { contains: description } });
    }

    return this.prismaService.challenge.findMany({
      where: query,
      skip: limit * (page - 1),
      take: limit,
    });
  }

  private attachToQuery(
    query: Prisma.ChallengeWhereInput,
    clause: Prisma.ChallengeWhereInput,
  ) {
    Object.assign(query, clause);
  }
}
