import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/services/prisma.service';
import { ChallengeNotFound } from '@shared/errors';

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
