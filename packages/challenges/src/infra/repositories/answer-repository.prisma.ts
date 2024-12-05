import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  CreateAnswerRequestDto,
  ListAnswersRequestDto,
  UpdateAnswerRequestDto,
} from '@core/dtos/answers';
import { Answer } from '@core/models';
import { AnswerRepository } from '@core/repositories/answer.repository';
import { PaginateQueryService } from '../services/paginate-query.service';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class AnswerRepositoryPrisma implements AnswerRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginateQueryService: PaginateQueryService,
  ) {}

  async save(data: CreateAnswerRequestDto) {
    const model = await this.prismaService.answer.create({ data });
    return model as Answer;
  }

  async update({ id, grade, status }: UpdateAnswerRequestDto) {
    const model = await this.prismaService.answer.update({
      where: { id },
      data: { grade, status },
    });
    return model as Answer;
  }

  async listPaginated({ queryFields, limit, page }: ListAnswersRequestDto) {
    const { challengeId, status } = queryFields;
    const query: Prisma.AnswerWhereInput = {};

    if (challengeId) this.attachFieldToQuery(query, { challengeId });
    if (status) this.attachFieldToQuery(query, { status });

    return this.paginateQueryService.run({
      query,
      model: 'answer',
      limit,
      page,
    });
  }

  private attachFieldToQuery<T>(query: T, clause: T) {
    Object.assign(query, clause);
  }
}
