import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming'
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';
// we created a TS interface to help us make sure our subject and dat are correct, since there will be so many this well help. 
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject : Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service'

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data)

    msg.ack();
    
  }
}