import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/database/prisma.service';
import { ListChallengesArgs } from './list-challenges.args';

@Injectable()
export class ListChallengesService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(data: ListChallengesArgs) {
    const query: Prisma.ChallengeWhereInput = {};

    if (data.title) {
      this.attachToQuery(query, { title: { contains: data.title } });
    }
    if (data.description) {
      this.attachToQuery(query, {
        description: { contains: data.description },
      });
    }

    const list = await this.prismaService.challenge.findMany({
      where: {
        OR: [query],
      },
    });

    return list;
  }

  private attachToQuery(
    query: Prisma.ChallengeWhereInput,
    clause: Prisma.ChallengeWhereInput,
  ) {
    Object.assign(query, clause);
  }
}
