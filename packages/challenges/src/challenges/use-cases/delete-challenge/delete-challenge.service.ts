import { Injectable } from '@nestjs/common';
import { ChallengeNotFound } from '@core/errors';
import { PrismaService } from '@infra/database/prisma.service';

@Injectable()
export class DeleteChallengeService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string) {
    const challenge = await this.prismaService.challenge.findFirst({
      where: { id },
    });

    if (!challenge) throw new ChallengeNotFound();

    return this.prismaService.challenge.delete({ where: { id } });
  }
}
