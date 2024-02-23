import BaseHandler from '../classes/base-handler';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JwtPayloadExt } from '../utils/jwt.util';

class Auth extends BaseHandler {
	handle(req: Request, res: Response) {
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

		req['user'] = user;

		this.next?.handle(req, res);
	}
}

export default Auth;
