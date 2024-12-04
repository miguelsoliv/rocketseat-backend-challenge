import { Inject, Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { DatabaseModule } from '@infra/database/database.module';
import { PaginateQueryService } from '@core/services';
import { AnswersResolver } from './answers.resolver';
import { AnswerChallengeService } from './use-cases/answer-challenge';
import { ListAnswersService } from './use-cases/list-answers';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'CHALLENGES_SERVICE',
        transport: Transport.KAFKA,
        options: {
          producer: { createPartitioner: Partitioners.DefaultPartitioner },
          client: {
            clientId: 'challenges',
            brokers: ['localhost:9092'],
          },
          consumer: { groupId: 'challenge-consumer' },
        },
      },
    ]),
  ],
  providers: [
    AnswersResolver,
    AnswerChallengeService,
    PaginateQueryService,
    ListAnswersService,
  ],
})
export class AnswersModule {
  constructor(
    @Inject('CHALLENGES_SERVICE')
    private readonly kafka: ClientKafka,
  ) {}

  onModuleInit() {
    this.kafka.subscribeToResponseOf('challenge.correction');
  }
}
