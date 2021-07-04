import { Publisher } from "@ticket.dev/common";
import { TicketCreatedEvent } from "@ticket.dev/common";
import { Subjects } from "@ticket.dev/common";
import { TicketCreatedListener } from "./ticket-created-listener";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

}