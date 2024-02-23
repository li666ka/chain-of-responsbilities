import express, { Express } from 'express';
import { orders } from './routes/orders.route';
import logger from 'morgan';

export const app: Express = express();

app.use(logger('dev'));

app.use('/orders', orders);
