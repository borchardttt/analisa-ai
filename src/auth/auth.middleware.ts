import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const publicRoutes = [
      { path: '/auth/login', method: 'POST' },
      { path: '/users/register', method: 'POST' },
    ];

    const cleanPath = req.originalUrl.replace(/\?.*$/, '').replace(/\/$/, '');
    console.log('📥 Método:', req.method);
    console.log('📥 Caminho:', cleanPath);

    const isPublic = publicRoutes.some(
      (route) => route.path === cleanPath && route.method === req.method,
    );

    if (isPublic) {
      console.log('✅ Rota pública liberada:', cleanPath);
      return next();
    }

    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as any).user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }
}
