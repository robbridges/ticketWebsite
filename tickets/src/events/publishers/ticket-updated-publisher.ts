import { Publisher, Subjects, TicketUpdatedEvent } from "@ticket.dev/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject : Subjects.TicketUpdated = Subjects.TicketUpdated;
  
}
