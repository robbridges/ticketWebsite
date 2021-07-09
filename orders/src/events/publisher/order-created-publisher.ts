import { Publisher, OrderCreatedEvent, Subjects } from "@ticket.dev/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}