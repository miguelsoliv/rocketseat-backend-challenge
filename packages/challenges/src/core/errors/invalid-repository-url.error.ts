import { NotFoundException } from '@nestjs/common';

export class InvalidRepositoryUrlError extends NotFoundException {
  message = 'Invalid or private repository URL';
}
