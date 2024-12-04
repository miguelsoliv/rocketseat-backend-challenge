import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UuidScalar } from '@core/scalars';
import { ChallengesModule } from './modules/challenges/challenges.module';
import { AnswersModule } from './modules/answers/answers.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/core/schema.gql'),
      resolvers: { UUID: UuidScalar },
    }),
    ChallengesModule,
    AnswersModule,
  ],
})
export class AppModule {}
