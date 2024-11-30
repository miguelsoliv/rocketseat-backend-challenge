import { Injectable } from '@nestjs/common';
import { CreateChallengeInput } from './dtos';
import { Challenge } from './challenges.model';

@Injectable()
export class ChallengesService {
  async create(data: CreateChallengeInput) {
    return {} as Challenge;
  }
}
