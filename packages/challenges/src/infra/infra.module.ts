import { Module } from '@nestjs/common';
import { PaginateQueryService } from './services/paginate-query.service';
import { PrismaService } from './services/prisma.service';

@Module({
  providers: [PrismaService, PaginateQueryService],
  exports: [PrismaService, PaginateQueryService],
})
export class InfraModule {}
