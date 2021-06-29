import express, {Request, Response} from 'express';
import { Ticket} from '../models/tickets';

const router = express.Router();
//route handler to get all tickets created
router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.send(tickets);
});

export {router as indexTicketsRouter };