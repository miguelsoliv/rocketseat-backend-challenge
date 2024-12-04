import { Inject, Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { InfraModule } from '@infra/infra.module';
import { AnswersResolver } from './answers.resolver';
import { AnswerChallengeService } from './use-cases/answer-challenge';
import { ListAnswersService } from './use-cases/list-answers';

@Module({
  imports: [
    InfraModule,
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
  providers: [AnswersResolver, AnswerChallengeService, ListAnswersService],
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
