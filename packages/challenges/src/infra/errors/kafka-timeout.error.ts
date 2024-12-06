import { RequestTimeoutException } from '@nestjs/common';

export class KafkaTimeoutError extends RequestTimeoutException {
  message = 'Kafka timed out when sending event';
}
