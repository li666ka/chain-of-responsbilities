import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { createOrder } from '../middlewares/create-order';
import { authorize } from '../middlewares/auth';

export const orders: Router = Router();

orders.post('/', authorize, validate('orders-post'), createOrder);
