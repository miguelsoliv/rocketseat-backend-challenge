import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { EVENT_HANDLER_TOKEN } from './events-handler.constants';
import { ChallengeAnsweredEvent, CorrectedAnswerEvent } from './events';

@Injectable()
export class KafkaService {
  constructor(
    @Inject(EVENT_HANDLER_TOKEN)
    private readonly kafka: ClientKafka,
  ) {}

  async triggerChallengeAnsweredEvent(data: ChallengeAnsweredEvent) {
    return firstValueFrom(
      this.kafka.send<CorrectedAnswerEvent, ChallengeAnsweredEvent>(
        'challenge.correction',
        data,
      ),
    );
  }
}
