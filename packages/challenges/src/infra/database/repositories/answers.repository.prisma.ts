import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Answer } from '@core/answers/answer.model';
import { AnswersRepository } from '@core/repositories/answers';
import { ListPaginatedAnswersRequestDto } from '@core/repositories/answers/list-paginated-answers-request.dto';
import { UpdateAnswerRequestDto } from '@core/repositories/answers/update-answer-request.dto';
import { CreateAnswerRequestDto } from '@core/repositories/answers/create-answer-request.dto';
import { PaginateQueryService } from '../../services/paginate-query.service';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class AnswersRepositoryPrisma implements AnswersRepository {
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

  async listPaginated({
    queryFields,
    limit,
    page,
  }: ListPaginatedAnswersRequestDto) {
    const { challengeId, status, answeredEndAt, answeredStartAt } = queryFields;
    const query: Prisma.AnswerWhereInput = {};

    if (challengeId) this.attachFieldToQuery(query, { challengeId });
    if (status) this.attachFieldToQuery(query, { status });
    if (answeredStartAt || answeredEndAt) {
      const startAtFilter = answeredStartAt && { gte: answeredStartAt };
      const endAtFilter = answeredEndAt && { lte: answeredEndAt };

      this.attachFieldToQuery(query, {
        createdAt: { ...startAtFilter, ...endAtFilter },
      });
    }

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
