import mongoose from 'mongoose';
import express, { Request, Response} from 'express';
import { requireAuth, validateRequest } from '@ticket.dev/common';
import { body } from 'express-validator'

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
  res.send({});
});

export { router as newOrderRouter };