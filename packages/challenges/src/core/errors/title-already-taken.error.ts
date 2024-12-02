import { ConflictException } from '@nestjs/common';

export class TitleAlreadyTaken extends ConflictException {
  message = 'Title already taken';
}
