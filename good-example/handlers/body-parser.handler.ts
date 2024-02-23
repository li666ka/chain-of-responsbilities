import BaseHandler from '../classes/base-handler';
import { Request, Response } from 'express';

class BodyParser extends BaseHandler {
	handle(req: Request, res: Response) {
		let bodyRaw = '';

		req.on('data', (chunk) => {
			// Get raw body
			bodyRaw += chunk;
		});

		req.on('end', () => {
			console.log('Type of incoming body:', typeof bodyRaw);
			console.log('Body:', bodyRaw);

			// Parsing body: string to json
			const bodyJson = JSON.parse(bodyRaw);
			console.log('Type of parsed body:', typeof bodyJson);
			console.log('Body:', bodyJson);

			// Set the json body to body field in req
			req.body = bodyJson;

			this.next?.handle(req, res);
		});
	}
}

export default BodyParser;
