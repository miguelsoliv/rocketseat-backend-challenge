import { Inject, Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { KafkaService } from './kafka.service';
import { EVENT_HANDLER_TOKEN } from './events-handler.constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EVENT_HANDLER_TOKEN,
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
  providers: [KafkaService],
  exports: [KafkaService],
})
export class EventsHandlerModule {
  constructor(
    @Inject(EVENT_HANDLER_TOKEN)
    private readonly kafka: ClientKafka,
  ) {}

  onModuleInit() {
    this.kafka.subscribeToResponseOf('challenge.correction');
  }
}
