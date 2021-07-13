import { OrderCreatedListener } from "../order-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/tickets";
import { OrderCreatedEvent, OrderStatus } from "@ticket.dev/common";
import mongoose from "mongoose";



const setup = async () => {
  // Create listener instance
  const listener = new OrderCreatedListener(natsWrapper.client);

  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: 'asdf',
  });
  await ticket.save();

  //create fake data event
  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'dwadwad',
    expiresAt: 'dwadwad',
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
  };

  //@ts-ignore
  const msg: Message ={
    ack: jest.fn()
  };

  return {listener,ticket,data,msg};
};

it('sets the userId of the ticket', async () => {
  const {listener, ticket, data, msg} = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);
  if (updatedTicket) {
    expect(updatedTicket.orderId).toEqual(data.id);
  }

});

it('acks the message', async () => {
  const {listener, ticket, data, msg} = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});