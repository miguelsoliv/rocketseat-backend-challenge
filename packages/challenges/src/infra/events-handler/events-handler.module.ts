import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { EVENTS_HANDLER_TOKEN } from '@core/events/events-handler';
import { KafkaService } from './kafka.service';
import { KAFKA_MODULE_TOKEN } from './kafka.constants';

const kafkaService = [
  { provide: EVENTS_HANDLER_TOKEN, useClass: KafkaService },
];

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_MODULE_TOKEN,
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
  providers: kafkaService,
  exports: kafkaService,
})
export class EventsHandlerModule {}
