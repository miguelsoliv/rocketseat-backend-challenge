import { PaginationResponseDto } from '@shared/dtos';
import { Answer } from '../../answers/answer.model';
import { PaginateDataDto } from '../common';
import { CreateAnswerRequestDto } from './create-answer-request.dto';
import { UpdateAnswerRequestDto } from './update-answer-request.dto';

export const ANSWERS_REPOSITORY_TOKEN = 'ANSWERS_REPOSITORY';

export abstract class AnswersRepository {
  abstract save(data: CreateAnswerRequestDto): Promise<Answer>;
  abstract update(data: UpdateAnswerRequestDto): Promise<Answer>;
  abstract listPaginated(
    data: PaginateDataDto<Answer>,
  ): Promise<PaginationResponseDto<Answer>>;
}
