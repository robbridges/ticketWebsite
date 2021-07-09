import { Publisher, OrderCancelledEvent, Subjects } from "@ticket.dev/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}