import { faker } from '@faker-js/faker';
import { Answer } from '@core/answers/answer.model';
import { AnswersRepository } from '@core/repositories/answers';
import { CreateAnswerRequestDto } from '@core/repositories/answers/create-answer-request.dto';
import { UpdateAnswerRequestDto } from '@core/repositories/answers/update-answer-request.dto';
import { ListPaginatedAnswersRequestDto } from '@core/repositories/answers/list-paginated-answers-request.dto';

export class AnswersRepositoryFake implements AnswersRepository {
  answers = [] as Answer[];

  async save(data: CreateAnswerRequestDto) {
    const answerData: Answer = {
      id: faker.string.uuid(),
      grade: data.grade,
      status: data.status,
      challengeId: data.challengeId,
      repositoryUrl: data.repositoryUrl,
      createdAt: new Date(),
    };

    this.answers.push(answerData);
    return answerData;
  }

  async update(data: UpdateAnswerRequestDto) {
    let answerToBeUpdated = null;

    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i].id !== data.id) continue;

      answerToBeUpdated = { ...this.answers[i], ...data };
      this.answers.splice(i, 1, answerToBeUpdated);
      break;
    }

    return answerToBeUpdated;
  }

  async listPaginated({
    queryFields,
    limit,
    page,
  }: ListPaginatedAnswersRequestDto) {
    const { answeredStartAt, answeredEndAt, challengeId, status } = queryFields;

    const createFiltersConditions = (
      answer: Answer,
    ): Record<keyof typeof queryFields, boolean> => {
      const startAtFilter =
        answer.createdAt.getTime() >= answeredStartAt.getTime();
      const endAtFilter = answer.createdAt.getTime() <= answeredEndAt.getTime();

      return {
        answeredStartAt: startAtFilter,
        answeredEndAt: answeredStartAt
          ? startAtFilter && endAtFilter
          : endAtFilter,
        challengeId: answer.challengeId === challengeId,
        status: answer.status === status,
      };
    };

    const docs = this.answers.filter((answer) => {
      if (!queryFields) return true;

      const filtersConditions = createFiltersConditions(answer);

      return Object.entries(queryFields).every(([filterKey, filterValue]) => {
        if (!filterValue) return true;
        return filtersConditions[filterKey];
      });
    });

    const total = this.answers.length;
    const remainingDocsToShow = total - ((page - 1) * limit + docs.length);

    return {
      docs,
      total,
      hasNextPage: remainingDocsToShow >= 1,
    };
  }
}
