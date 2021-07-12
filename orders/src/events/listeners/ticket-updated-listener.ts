import { Message } from "node-nats-streaming";
import {Subjects, Listener, TicketUpdatedEvent} from '@ticket.dev/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findByEvent(data);
    

    if(!ticket) {
      throw new Error('Ticket not found');
    }
    
    // If I ever need to switch to a different concurrency control that is not controleld by the app I will uncomment this line of code and the line in the ticket model on this service
    const {title, price, /*version */} = data;
    ticket.set({title, price, /*version */ });
    await ticket.save();

    msg.ack();
  }

}