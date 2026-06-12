import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // 1. Import bcryptjs
import UserList from '../models/user_list.models';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ul_name, ul_password } = req.body;

    // 1. Cari user di database berdasarkan username (ul_name)
    const user = await UserList.findOne({ where: { ul_name } });

    // 2. Jika user tidak ditemukan
    if (!user) {
      res.status(401).json({ 
        status: 'error', 
        message: 'Username atau password salah' 
      });
      return;
    }

    // 3. Bandingkan password input dengan hash di database
    const isMatch = await bcrypt.compare(ul_password, user.ul_password);
    if (!isMatch) {
      res.status(401).json({ 
        status: 'error', 
        message: 'Username atau password salah' 
      });
      return;
    }

    // 4. Jika cocok, siapkan data Payload untuk JWT
    const payload = {
      ul_id: user.ul_id,
      ur_id: user.ur_id,
    };

    // Ambil kunci rahasia dari .env
    const secret = process.env.JWT_SECRET || 'fallback_secret_key';

    // 5. Generate Token (Set agar token ini berlaku selama 1 hari / 24 jam)
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });

    // 6. Jangan pernah mengembalikan password ke Frontend
    const { ul_password: _, ...userData } = user.toJSON();

    // 7. Kirim respon sukses beserta token ke Frontend
    res.status(200).json({
      status: 'success',
      message: 'Login berhasil',
      data: {
        user: userData,
        token: token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Terjadi kesalahan pada server saat login', 
      error: error.message 
    });
  }
};