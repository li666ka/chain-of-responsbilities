import { JwtPayload, Secret } from 'jsonwebtoken';
import 'dotenv/config';

export interface JwtPayloadExt extends JwtPayload {
	username: string;
	role: string;
}

export const JWT_SECRET = process.env.JWT_SECRET as Secret;
