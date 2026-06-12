import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

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

  // 1. Cek apakah ada header authorization dan diawali dengan 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ 
      status: 'error', 
      message: 'Akses ditolak. Header otorisasi tidak ditemukan atau format salah.' 
    });
    return;
  }

  // 2. Ambil token dari header
  const token = authHeader.split(' ')[1];

  // 3. Pastikan token benar-benar ada (mencegah string "Bearer ")
  if (!token) {
    res.status(401).json({ 
      status: 'error', 
      message: 'Akses ditolak. Token tidak ditemukan.' 
    });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback_secret_key';
    
    // Verifikasi token dan cast hasilnya ke tipe yang kita inginkan
    const decoded = jwt.verify(token, secret) as { ul_id: number; ur_id: number };
    
    // Simpan payload token (ul_id, ur_id) ke dalam req.user
    req.user = decoded; 
    
    next();
  } catch (error) {
    // 4. Penanganan spesifik jika token kedaluwarsa (Expired)
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ 
        status: 'error', 
        message: 'Akses ditolak. Sesi (Token) Anda telah kedaluwarsa. Silakan login kembali.' 
      });
      return;
    }

    // Penanganan jika token sengaja diubah/tidak valid
    res.status(401).json({ 
      status: 'error', 
      message: 'Akses ditolak. Token tidak valid.' 
    });
  }
};

/**
 * Middleware untuk RBAC (Role-Based Access Control)
 * ur_id: 1 (Admin), 2 (Owner), 3 (Kasir)
 */
export const requireRole = (allowedRoles: number[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    
    // Pastikan req.user ada dari middleware verifyToken sebelumnya
    if (!req.user || !req.user.ur_id) {
      res.status(401).json({ 
        status: 'error', 
        message: 'Akses ditolak. Sesi pengguna tidak valid.' 
      });
      return;
    }

    // Cek apakah ur_id dari user terdapat di dalam daftar role yang diperbolehkan
    if (!allowedRoles.includes(req.user.ur_id)) {
      res.status(403).json({ 
        status: 'error', 
        message: 'Akses ditolak. Role Anda tidak memiliki izin untuk tindakan ini.' 
      });
      return;
    }

    next();
  };
};