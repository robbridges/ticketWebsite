import express, { Request, Response} from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ticket.dev/common';
import { Order, OrderStatus } from '../models/order';

const router = express.Router();

router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const {orderId} = req.params;
  
  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  res.status(204).send(order);

  //publish an event letting every other service know that this order was cancelled

});

export { router as deleteOrderRouter };