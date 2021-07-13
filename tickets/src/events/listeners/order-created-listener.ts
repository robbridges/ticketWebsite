import { Listener, OrderCreatedEvent, Subjects } from "@ticket.dev/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/tickets";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    //reach into tickets collection and find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    //if no ticket, throw error
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    //Mark the ticket as being reserved by setting it's orderId property
    ticket.set({orderId: data.id});
    //save the ticket
    await ticket.save();
    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version
    });
    
    //ack the message
    msg.ack();
  }
}