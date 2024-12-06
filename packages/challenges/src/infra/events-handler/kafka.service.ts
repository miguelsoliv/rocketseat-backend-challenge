import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { KafkaTimeoutError } from '../errors';
import { EVENT_HANDLER_TOKEN } from './events-handler.constants';
import { ChallengeAnsweredEvent, CorrectedAnswerEvent } from './events';

@Injectable()
export class KafkaService {
  constructor(
    @Inject(EVENT_HANDLER_TOKEN)
    private readonly kafka: ClientKafka,
  ) {}

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
