import { Router, Request, Response } from 'express';
import BodyParser from '../handlers/body-parser.handler';
import Auth from '../handlers/auth.handler';
import Validator from '../handlers/validator.handler';
import OrderCreator from '../handlers/order-creator';

export const orders: Router = Router();

orders.post('/', (req: Request, res: Response) => {
	const authorizationHandler = new Auth();
	const parseBodyHandler = new BodyParser();
	const validationHandler = new Validator('orders-post');
	const createOrderHandler = new OrderCreator();

	authorizationHandler.setNext(parseBodyHandler);
	parseBodyHandler.setNext(validationHandler);
	validationHandler.setNext(createOrderHandler);

	authorizationHandler.handle(req, res);
});
