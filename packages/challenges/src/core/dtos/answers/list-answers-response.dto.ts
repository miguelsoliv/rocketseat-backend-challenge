import { Answer } from '../../models';
import { PaginationResponseDto } from '../common';

export class ListAnswersResponseDto extends PaginationResponseDto<Answer> {}
