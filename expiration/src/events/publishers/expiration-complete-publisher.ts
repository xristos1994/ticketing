import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@ck1994tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
