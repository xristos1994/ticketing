import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@ck1994tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
