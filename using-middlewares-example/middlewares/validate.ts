import { Request, Response } from 'express';

export function validate(reqType: string) {
	return (req: Request, res: Response, next: any) => {
		const { body } = req;

		if (reqType === 'orders-post') {
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
		next();
	};
}
