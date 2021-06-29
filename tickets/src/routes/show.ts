import express, {Request, Response, Router} from 'express';

import { Ticket} from '../models/tickets';
import { NotFoundError } from '@ticket.dev/common';

const router = express.Router();
// route handler to look up a specific ticket by id
router.get('/api/tickets/:id', async (req: Request, res, Response) => {
  const ticket = await Ticket.findById(req.params.id);
  
  if (!ticket) {
    throw new NotFoundError();
  }
  res.send(ticket);
});

export { router as ShowTicketRouter};