import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { Ticket } from "../../../models/ticket";
import { TicketUpdatedEvent } from "@ticket.dev/common";
import { Message } from "node-nats-streaming";
import  mongoose  from "mongoose";



const setup = async () => {
  // Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  // Create a save a ticket into ticket collection
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();
  // Create a fake data object
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'concert!',
    price: 30,
    userId: 'djklwajdlk'
  };
  //create a msg object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
  //return all of them for previous tests below to use
  return {msg, data, ticket, listener};
}

it('finds, updates, and saves a ticket', async () => {
  const {msg, data, ticket, listener} = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);
  
  if (updatedTicket) {
    expect(updatedTicket.title).toEqual(data.title);
    expect(updatedTicket.price).toEqual(data.price);
    expect(updatedTicket.version).toEqual(data.version);
  }
});

it('acks the message', async () => {
  const {msg, data, listener} = await setup();

  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version', async () => {
  const {msg, data, listener} = await setup();

  data.version = 10;
  
  try {
    await listener.onMessage(data, msg);
  } catch (err) {

  }

  expect(msg.ack).not.toHaveBeenCalled();
});