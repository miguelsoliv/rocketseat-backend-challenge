import { Answer } from '../../models';
import { PaginationRequestDto } from '../common';

export class ListAnswersRequestDto extends PaginationRequestDto<Answer> {}
