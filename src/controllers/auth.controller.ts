import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserList from '../models/user_list.models';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ul_name, ul_password } = req.body;

    // 1. Cari user di database berdasarkan username (ul_name)
    const user = await UserList.findOne({ where: { ul_name } });

    // 2. Jika user tidak ditemukan ATAU password tidak cocok
    // Catatan: Ini menggunakan perbandingan teks biasa karena saat ini di admin.controller
    // password juga disimpan dalam teks biasa. Nanti saat produksi, gunakan bcrypt.compare()
    if (!user || user.ul_password !== ul_password) {
      res.status(401).json({ 
        status: 'error', 
        message: 'Username atau password salah' 
      });
      return;
    }

    // 3. Jika cocok, siapkan data Payload untuk JWT
    const payload = {
      ul_id: user.ul_id,
      ur_id: user.ur_id,
    };

    // Ambil kunci rahasia dari .env
    const secret = process.env.JWT_SECRET || 'fallback_secret_key';

    // 4. Generate Token (Set agar token ini berlaku selama 1 hari / 24 jam)
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });

    // 5. Jangan pernah mengembalikan password ke Frontend
    const { ul_password: _, ...userData } = user.toJSON();

    // 6. Kirim respon sukses beserta token ke Frontend
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