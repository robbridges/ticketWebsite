import express, {Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError
} from '@ticket.dev/common';

import { Ticket } from '../models/tickets';

const router = express.Router();
//basic route handler to update tickets
router.put(
  '/api/tickets/:id', 
  requireAuth,
  [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and greater than 0')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if(!ticket) {
    throw new NotFoundError();
  }
  // over ride the typescript error as we made sure that current user was set in our require auth middleware
  if (ticket.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  ticket.set({
    title: req.body.title,
    price: req.body.price
  });
  await ticket.save();

  res.send(ticket);
});

export { router as updateTicketRouter };
