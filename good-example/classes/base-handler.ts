import Handler from '../interfaces/handler';
import { Request, Response } from 'express';

abstract class BaseHandler implements Handler {
	protected next: Handler | null;

	abstract handle(req: Request, res: Response): void;

	setNext(handler: Handler): void {
		this.next = handler;
	}
}

export default BaseHandler;
