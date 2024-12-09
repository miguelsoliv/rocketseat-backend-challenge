import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { KafkaService } from './kafka.service';

export const EVENT_HANDLER_TOKEN = 'EVENT_HANDLER';

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
export class EventsHandlerModule {}
