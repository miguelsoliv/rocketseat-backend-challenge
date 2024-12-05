import { Challenge } from '../../models';
import { PaginationResponseDto } from '../common';

export class ListChallengesResponseDto extends PaginationResponseDto<Challenge> {}
