import { BadRequestException } from '@nestjs/common';

export class InvalidUUID extends BadRequestException {
  message = 'Invalid UUID';
}
