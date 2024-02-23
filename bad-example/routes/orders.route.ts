import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JwtPayloadExt } from '../utils/jwt.util';

export const orders: Router = Router();

orders.post('/', (req: Request, res: Response) => {
	let bodyRaw = '';

	req.on('data', (chunk) => {
		// Get raw body
		bodyRaw += chunk;
	});

	req.on('end', () => {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			res.status(401).json('No bearer token');
			return;
		}

		const token: string = authHeader.replace('Bearer ', '');
		const decoded = jwt.verify(token, JWT_SECRET);
		if (typeof decoded === 'string') {
			res.status(401).json('Incorrect bearer token');
			return;
		}

		const user = decoded as JwtPayloadExt;

		console.log('Jwt decoded:', user);

		console.log('Type of incoming body:', typeof bodyRaw);
		console.log('Body:', bodyRaw);

		// Parsing body: string to json
		const bodyJson = JSON.parse(bodyRaw);
		console.log('Type of parsed body:', typeof bodyJson);
		console.log('Body:', bodyJson);

		// Validation
		if (
			!(
				'order' in bodyJson &&
				'product' in bodyJson.order &&
				'number' in bodyJson.order &&
				'id' in bodyJson.order['product'] &&
				'name' in bodyJson.order['product']
			)
		) {
			res.status(400).json('Incorrect data');
			return;
		}

		// ... queries to the DB

		res.send(
			`Order on ${bodyJson['order']['product']['name']} by user ${user.username} created successfully!`
		);
	});
});
