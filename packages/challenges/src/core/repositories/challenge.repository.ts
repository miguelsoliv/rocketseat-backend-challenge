import {
  CreateChallengeRequestDto,
  ListChallengesRequestDto,
  ListChallengesResponseDto,
  UpdateChallengeRequestDto,
} from '../dtos/challenges';
import { Challenge } from '../models';

export const CHALLENGE_REPOSITORY_TOKEN = 'CHALLENGE_REPOSITORY';

export abstract class ChallengeRepository {
  abstract save(data: CreateChallengeRequestDto): Promise<Challenge>;
  abstract update(data: UpdateChallengeRequestDto): Promise<Challenge>;
  abstract delete(id: string): Promise<Challenge>;
  abstract findById(id: string): Promise<Challenge | null>;
  abstract findByTitle(title: string): Promise<Challenge | null>;
  abstract listPaginated(
    data: ListChallengesRequestDto,
  ): Promise<ListChallengesResponseDto>;
}
