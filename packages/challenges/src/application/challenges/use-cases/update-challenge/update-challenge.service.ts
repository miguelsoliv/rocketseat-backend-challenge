import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/services/prisma.service';
import { ChallengeNotFound } from '@shared/errors';
import { TitleAlreadyTaken } from '../../errors';
import { UpdateChallengeInput } from './update-challenge.input';

@Injectable()
export class UpdateChallengeService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(data: UpdateChallengeInput) {
    const challengeToUpdate = await this.prismaService.challenge.findFirst({
      where: { id: data.id },
    });

    if (!challengeToUpdate) throw new ChallengeNotFound();

    const isTitleAvailable = await this.prismaService.challenge.findFirst({
      where: { title: data.title },
    });

    if (isTitleAvailable && isTitleAvailable.id !== data.id) {
      throw new TitleAlreadyTaken();
    }

    return this.prismaService.challenge.update({
      where: { id: data.id },
      data: { title: data.title, description: data.description },
    });
  }
}
