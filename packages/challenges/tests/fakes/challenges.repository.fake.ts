import { faker } from '@faker-js/faker';
import { Challenge } from '@core/challenges/challenge.model';
import { ChallengesRepository } from '@core/repositories/challenges';
import { CreateChallengeRequestDto } from '@core/repositories/challenges/create-challenge-request.dto';
import { ListPaginatedChallengesRequestDto } from '@core/repositories/challenges/list-paginated-challenges-request.dto';
import { UpdateChallengeRequestDto } from '@core/repositories/challenges/update-challenge-request.dto';

export class ChallengesRepositoryFake implements ChallengesRepository {
  challenges = [] as Challenge[];

  async save(data: CreateChallengeRequestDto) {
    const challengeData: Challenge = {
      id: faker.string.uuid(),
      title: data.title,
      description: data.description,
      createdAt: new Date(),
    };

    this.challenges.push(challengeData);
    return challengeData;
  }

  async update(data: UpdateChallengeRequestDto) {
    let challengeToBeUpdated = null;

    for (let i = 0; i < this.challenges.length; i++) {
      if (this.challenges[i].id !== data.id) continue;

      challengeToBeUpdated = { ...this.challenges[i], ...data };
      this.challenges.splice(i, 1, challengeToBeUpdated);
      break;
    }

    return challengeToBeUpdated;
  }

  async delete(id: string) {
    const challengeIdxToDelete = this.challenges.findIndex(
      (challenge) => challenge.id === id,
    );

    const [deletedElement] = this.challenges.splice(challengeIdxToDelete, 1);
    return deletedElement;
  }

  async findById(id: string) {
    return this.challenges.find((challenge) => challenge.id === id);
  }

  async findByTitle(title: string) {
    return this.challenges.find((challenge) => challenge.title === title);
  }

  async listPaginated({
    queryFields,
    limit,
    page,
  }: ListPaginatedChallengesRequestDto) {
    const { description, title } = queryFields;

    const createFiltersConditions = (
      challenge: Challenge,
    ): Record<keyof typeof queryFields, boolean> => ({
      title: challenge.title.includes(title),
      description: challenge.description.includes(description),
    });

    const docs = this.challenges.filter((challenge) => {
      if (!queryFields) return true;

      const filtersConditions = createFiltersConditions(challenge);

      return Object.entries(queryFields).every(([filterKey, filterValue]) => {
        if (!filterValue) return true;
        return filtersConditions[filterKey];
      });
    });

    const total = this.challenges.length;
    const remainingDocsToShow = total - ((page - 1) * limit + docs.length);

    return {
      docs,
      total,
      hasNextPage: remainingDocsToShow >= 1,
    };
  }
}
