import { Challenge } from '../../models';
import { PaginationRequestDto } from '../common';

export class ListChallengesRequestDto extends PaginationRequestDto<Challenge> {}
