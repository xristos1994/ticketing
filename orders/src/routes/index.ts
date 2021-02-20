import express, { Request, Response } from 'express';
import { requireAuth } from '@ck1994tickets/common';
import { Order } from './../models/order';

const router = express.Router();

// @ts-ignore
router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');

  res.send(orders);
});

export { router as indexOrderRouter };
