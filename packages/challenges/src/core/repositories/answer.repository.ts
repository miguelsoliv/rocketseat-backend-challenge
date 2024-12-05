import {
  CreateAnswerRequestDto,
  ListAnswersRequestDto,
  ListAnswersResponseDto,
  UpdateAnswerRequestDto,
} from '../dtos/answers';
import { Answer } from '../models';

export const ANSWER_REPOSITORY_TOKEN = 'ANSWER_REPOSITORY';

export abstract class AnswerRepository {
  abstract save(data: CreateAnswerRequestDto): Promise<Answer>;
  abstract update(data: UpdateAnswerRequestDto): Promise<Answer>;
  abstract listPaginated(
    data: ListAnswersRequestDto,
  ): Promise<ListAnswersResponseDto>;
}
