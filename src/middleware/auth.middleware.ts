import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Menggunakan Omit<Request, 'user'> untuk membuang definisi 'user' yang bentrok dari global namespace
export interface AuthRequest extends Omit<Request, 'user'> {
  user?: {
    ul_id: number;
    ur_id: number;
    [key: string]: any;
  };
}

/**
 * Middleware untuk memverifikasi JWT Token dari header Authorization
 */
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ 
      status: 'error', 
      message: 'Akses ditolak. Token tidak ditemukan atau format salah.' 
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'fallback_secret_key';
    const decoded = jwt.verify(token, secret) as AuthRequest['user'];
    
    // Simpan payload token (ul_id, ur_id) ke dalam req.user
    req.user = decoded; 
    
    next();
  } catch (error) {
    res.status(403).json({ 
      status: 'error', 
      message: 'Token tidak valid atau sudah kedaluwarsa.' 
    });
  }
};

/**
 * Middleware untuk RBAC (Role-Based Access Control)
 * ur_id: 1 (Admin), 2 (Owner), 3 (Kasir)
 */
export const requireRole = (allowedRoles: number[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !req.user.ur_id) {
      res.status(401).json({ 
        status: 'error', 
        message: 'Akses ditolak. Informasi role tidak ditemukan.' 
      });
      return;
    }

    if (!allowedRoles.includes(req.user.ur_id)) {
      res.status(403).json({ 
        status: 'error', 
        message: 'Akses ditolak. Role Anda tidak memiliki izin untuk resource ini.' 
      });
      return;
    }

    next();
  };
};