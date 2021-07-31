import { Publisher, Subjects, TicketCreatedEvent } from "@ticket.dev/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject : Subjects.TicketCreated = Subjects.TicketCreated;

}
