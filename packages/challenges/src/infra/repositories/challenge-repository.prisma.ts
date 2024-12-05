import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  CreateChallengeRequestDto,
  ListChallengesRequestDto,
  UpdateChallengeRequestDto,
} from '@core/dtos/challenges';
import { ChallengeRepository } from '@core/repositories/challenge.repository';
import { PaginateQueryService } from '../services/paginate-query.service';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class ChallengeRepositoryPrisma implements ChallengeRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginateQueryService: PaginateQueryService,
  ) {}

  async save(data: CreateChallengeRequestDto) {
    return this.prismaService.challenge.create({ data });
  }

  async update({ id, description, title }: UpdateChallengeRequestDto) {
    return this.prismaService.challenge.update({
      where: { id },
      data: { title, description },
    });
  }

  async delete(id: string) {
    return this.prismaService.challenge.delete({ where: { id } });
  }

  async findById(id: string) {
    return this.prismaService.challenge.findFirst({ where: { id } });
  }

  async findByTitle(title: string) {
    return this.prismaService.challenge.findFirst({ where: { title } });
  }

  async listPaginated({ queryFields, limit, page }: ListChallengesRequestDto) {
    const { description, title } = queryFields;
    const query: Prisma.ChallengeWhereInput = {};

    if (title) this.attachFieldToQuery(query, { title: { contains: title } });
    if (description) {
      this.attachFieldToQuery(query, {
        description: { contains: description },
      });
    }

    return this.paginateQueryService.run({
      query,
      model: 'challenge',
      limit,
      page,
    });
  }

  private attachFieldToQuery<T>(query: T, clause: T) {
    Object.assign(query, clause);
  }
}
