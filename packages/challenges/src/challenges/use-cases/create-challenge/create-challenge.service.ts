import { Injectable } from '@nestjs/common';
import { TitleAlreadyTaken } from '@core/errors';
import { PrismaService } from '@infra/database/prisma.service';
import { CreateChallengeInput } from './create-challenge.input';

@Injectable()
export class CreateChallengeService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(data: CreateChallengeInput) {
    const isTitleTaken = await this.prismaService.challenge.findFirst({
      where: { title: data.title },
    });

    if (isTitleTaken) throw new TitleAlreadyTaken();

    return this.prismaService.challenge.create({ data });
  }
}
