import BaseHandler from '../classes/base-handler';
import { Request, Response } from 'express';

class OrderCreator extends BaseHandler {
	handle(req: Request, res: Response) {
		const { body, user } = req;

		// ... queries to the DB

		res.send(
			`Order on ${body['order']['product']['name']} by user ${user.username} created successfully!`
		);
	}
}

export default OrderCreator;
