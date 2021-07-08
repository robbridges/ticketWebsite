import mongoose from 'mongoose';
import express, { Request, Response} from 'express';
import { NotFoundError, requireAuth, validateRequest, OrderStatus, BadRequestError } from '@ticket.dev/common';
import { body } from 'express-validator';
import {Ticket} from '../models/ticket';
import { Order } from '../models/order';


const router = express.Router();

router.post('/api/orders', requireAuth, [
  body('ticketId')
    .not()
    .isEmpty()
    /* I don't like the idea of assuming our event would be using Mongo, there has to be a better way. Though I am do not expect this app to ever be used
     the below check is really bad micro service design, TODO: try to fix with better implementation
    */
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('TicketId must be provided')
], validateRequest, async (req: Request, res: Response) => {
  const { ticketId } = req.body;
  // Find the ticket the user is trying to order in database
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new NotFoundError();
  }

  /* Make sure the ticket is not already reserved
   Run query to look at all orders, Find an order where the ticket is not the ticket we just found
   the orders status is not cancelled
   if we find an order like this ticket is reserved
  */
  const existingOrder = await Order.findOne({
    ticket: ticket,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ]
    }
  });
  if (existingOrder) {
    throw new BadRequestError('This ticket is reserved');
  }
  // Calculate an expiration date for this order

  // Build the order, and save it to the database

  // Publish event that order has been created

  res.send({});
});

export { router as newOrderRouter };