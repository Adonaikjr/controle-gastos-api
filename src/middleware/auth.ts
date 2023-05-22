import jwt from 'jsonwebtoken';
import {  Response, NextFunction } from 'express';
import { Request as ExpressRequest } from 'express';

interface Request extends ExpressRequest {
  userId?: number;
}
interface TokenPayload {
  userId: number;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Token não informado.');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).send('Token inválido.');
  }
}