import { Publisher, OrderCreatedEvent, Subjects } from '@ck1994tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
