import { Request, Response } from 'express';

interface Handler {
	setNext(handler: Handler): void;

	handle(req: Request, res: Response): void;
}

export default Handler;
