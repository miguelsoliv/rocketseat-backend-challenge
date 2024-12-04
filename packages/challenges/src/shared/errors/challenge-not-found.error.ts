import { NotFoundException } from '@nestjs/common';

export class ChallengeNotFound extends NotFoundException {
  message = 'Challenge not found';
}
