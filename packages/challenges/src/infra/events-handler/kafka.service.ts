import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { ChallengeAnsweredEvent, CorrectedAnswerEvent } from '@core/events';
import { EventsHandler } from '@core/events/events-handler';
import { KafkaTimeoutError } from './errors';
import { KAFKA_MODULE_TOKEN } from './kafka.constants';

@Injectable()
export class KafkaService implements OnModuleInit, EventsHandler {
  constructor(
    @Inject(KAFKA_MODULE_TOKEN)
    private readonly kafka: ClientKafka,
  ) {}

  onModuleInit() {
    this.kafka.subscribeToResponseOf('challenge.correction');
  }

  async triggerChallengeAnsweredEvent(data: ChallengeAnsweredEvent) {
    const FIVE_SECONDS = 5000;

    return firstValueFrom(
      this.kafka
        .send<
          CorrectedAnswerEvent,
          ChallengeAnsweredEvent
        >('challenge.correction', data)
        .pipe(
          timeout(FIVE_SECONDS),
          catchError((err) => {
            return throwError(() =>
              err.name === 'TimeoutError' ? new KafkaTimeoutError() : err,
            );
          }),
        ),
    );
  }
}
