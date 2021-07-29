import express, {Request, Response} from 'express';
import { Ticket} from '../models/tickets';

const router = express.Router();
//route handler to get all tickets created filters out tickets with an orderId as assumably they would be able to purchase
router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({
    orderId: undefined
  });

  res.send(tickets);
});

export {router as indexTicketsRouter };