import { PaginationResponseDto } from '@shared/dtos';
import { Challenge } from '../../challenges/challenge.model';
import { CreateChallengeRequestDto } from './create-challenge-request.dto';
import { UpdateChallengeRequestDto } from './update-challenge-request.dto';
import { ListPaginatedChallengesRequestDto } from './list-paginated-challenges-request.dto';

export const CHALLENGES_REPOSITORY_TOKEN = 'CHALLENGES_REPOSITORY';

export abstract class ChallengesRepository {
  abstract save(data: CreateChallengeRequestDto): Promise<Challenge>;
  abstract update(data: UpdateChallengeRequestDto): Promise<Challenge>;
  abstract delete(id: string): Promise<Challenge>;
  abstract findById(id: string): Promise<Challenge | null>;
  abstract findByTitle(title: string): Promise<Challenge | null>;
  abstract listPaginated(
    data: ListPaginatedChallengesRequestDto,
  ): Promise<PaginationResponseDto<Challenge>>;
}
