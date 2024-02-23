import { Request, Response } from 'express';

export function createOrder(req: Request, res: Response) {
	const { body, user } = req;

	console.log(body);

	// ... queries to the DB

	res.send(
		`Order on ${body['order']['product']['name']} by user ${user.username} created successfully!`
	);
}
