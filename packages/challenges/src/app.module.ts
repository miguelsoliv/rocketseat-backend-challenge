import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UuidScalar } from '@shared/scalars';
import { ChallengesModule } from './application/challenges/challenges.module';
import { AnswersModule } from './application/answers/answers.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'generated/schema.gql'),
      resolvers: { UUID: UuidScalar },
    }),
    ChallengesModule,
    AnswersModule,
  ],
})
export class AppModule {}
