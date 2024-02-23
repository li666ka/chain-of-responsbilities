import BaseHandler from '../classes/base-handler';
import { Request, Response } from 'express';

class Validator extends BaseHandler {
	private readonly reqType: string;

	constructor(reqType: string) {
		super();
		this.reqType = reqType;
	}

	handle(req: Request, res: Response) {
		const { body } = req;
		if (this.reqType === 'orders-post') {
			if (
				!(
					'order' in body &&
					'product' in body.order &&
					'number' in body.order &&
					'id' in body.order['product'] &&
					'name' in body.order['product']
				)
			) {
				res.status(400).json('Incorrect data');
				return;
			}
		}
		this.next?.handle(req, res);
	}
}

export default Validator;
