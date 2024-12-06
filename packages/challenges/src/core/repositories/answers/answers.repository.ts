import { PaginationResponseDto } from '@shared/dtos';
import { Answer } from '../../answers/answer.model';
import { CreateAnswerRequestDto } from './create-answer-request.dto';
import { UpdateAnswerRequestDto } from './update-answer-request.dto';
import { ListPaginatedAnswersRequestDto } from './list-paginated-answers-request.dto';

export const ANSWERS_REPOSITORY_TOKEN = 'ANSWERS_REPOSITORY';

export abstract class AnswersRepository {
  abstract save(data: CreateAnswerRequestDto): Promise<Answer>;
  abstract update(data: UpdateAnswerRequestDto): Promise<Answer>;
  abstract listPaginated(
    data: ListPaginatedAnswersRequestDto,
  ): Promise<PaginationResponseDto<Answer>>;
}
