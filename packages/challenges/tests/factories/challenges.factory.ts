import { faker } from '@faker-js/faker';
import { CreateChallengeService } from '@core/challenges/services';
import { CreateChallengeDto } from '@core/challenges/dtos';

export const createFakeChallenges = async (
  createService: CreateChallengeService,
  numberOfChallengesToCreate = 1,
) => {
  const createPromises = [];

  for (let i = 0; i < numberOfChallengesToCreate; i++) {
    const mockedData: CreateChallengeDto = {
      title: faker.word.words(2),
      description: faker.word.words(5),
    };

    createPromises.push(createService.run(mockedData));
  }

  return Promise.all<ReturnType<typeof createService.run>>(createPromises);
};
