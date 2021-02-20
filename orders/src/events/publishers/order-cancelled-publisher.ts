import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@ck1994tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
