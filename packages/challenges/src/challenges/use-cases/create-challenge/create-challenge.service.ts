import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma.service';
import { CreateChallengeInput } from './create-challenge.input';

@Injectable()
export class CreateChallengeService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(data: CreateChallengeInput) {
    return this.prismaService.challenge.create({ data });
  }
}
