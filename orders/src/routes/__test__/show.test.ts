import  request  from 'supertest';
import { app } from '../../app'
import mongoose from 'mongoose'
import { Ticket } from '../../models/ticket';

it('Fetches the order', async () => {
  //create ticket
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();

  const user = global.signin();
  // make a request to build an order with this ticket
  const {body : order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ticketId: ticket.id})
    .expect(201);

  //make request to fetch order
  const {body: fetchedOrder} = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);
  expect(fetchedOrder.id).toEqual(order.id);
});


it('makes sure user cannot look at order that they do not own', async () => {
  //create ticket
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();

  const user = global.signin();
  // make a request to build an order with this ticket
  const {body : order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ticketId: ticket.id})
    .expect(201);

  //make request to fetch order
   await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(401);
  
});