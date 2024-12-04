import { PrismaService } from '@infra/database/prisma.service';
import { Injectable } from '@nestjs/common';

interface PaginateQueryRequest<T> {
  query: T;
  model: 'answer' | 'challenge';
  limit: number;
  page: number;
}

@Injectable()
export class PaginateQueryService {
  constructor(private readonly prismaService: PrismaService) {}

  async run<T>({ query, model, limit, page }: PaginateQueryRequest<T>) {
    const prismaModel = this.prismaService[model] as any;

    const total = await prismaModel.count({ where: query });
    const docs = await prismaModel.findMany({
      where: query,
      skip: limit * (page - 1),
      take: limit,
    });

    const hasNextPage = total - (page * limit + docs.length);

    return {
      docs,
      total,
      hasNextPage: hasNextPage >= 1,
    };
  }
}
