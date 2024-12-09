import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ChallengesRepository } from '@core/repositories/challenges';
import { ListPaginatedChallengesRequestDto } from '@core/repositories/challenges/list-paginated-challenges-request.dto';
import { CreateChallengeRequestDto } from '@core/repositories/challenges/create-challenge-request.dto';
import { UpdateChallengeRequestDto } from '@core/repositories/challenges/update-challenge-request.dto';
import { PrismaService } from '../services/prisma.service';
import { PaginateQueryService } from '../services/paginate-query.service';

@Injectable()
export class ChallengesRepositoryPrisma implements ChallengesRepository {
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

  async listPaginated({
    queryFields,
    limit,
    page,
  }: ListPaginatedChallengesRequestDto) {
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
