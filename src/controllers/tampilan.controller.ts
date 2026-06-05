import { Request, Response } from 'express';

// Import semua model tabel master
import Toko from '../models/toko.models'; 
import Satuan from '../models/satuan.models';
import Kategori from '../models/kategori.models';
import TempatSimpan from '../models/tempat_simpan'; 
import UserRole from '../models/user_role.models';

// =====================================================================
// FUNGSI UNTUK MENGAMBIL DATA REFERENSI (READ)
// =====================================================================

export const getSemuaReferensi = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    // Mengambil semua data master secara paralel agar proses lebih cepat
    const [toko, satuan, kategori, tempat_simpan, user_role] = await Promise.all([
      Toko.findAll(),
      Satuan.findAll(),
      Kategori.findAll(),
      TempatSimpan.findAll(),
      UserRole.findAll(),
    ]);

    // Mengembalikan response dengan format JSON
    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data referensi',
      data: {
        toko,
        satuan,
        kategori,
        tempat_simpan,
        user_role,
      },
    });
  } catch (error) {
    console.error('Error fetching data referensi:', error);
    
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server saat mengambil data referensi',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// --- Endpoint opsional untuk mengambil data referensi satu per satu ---

export const getReferensiToko = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const toko = await Toko.findAll();
    return res.status(200).json({ status: 'success', data: toko });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Gagal mengambil data toko' });
  }
};

export const getReferensiSatuan = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const satuan = await Satuan.findAll();
    return res.status(200).json({ status: 'success', data: satuan });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Gagal mengambil data satuan' });
  }
};

export const getReferensiKategori = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const kategori = await Kategori.findAll();
    return res.status(200).json({ status: 'success', data: kategori });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Gagal mengambil data kategori' });
  }
};

export const getReferensiTempatSimpan = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const tempat_simpan = await TempatSimpan.findAll();
    return res.status(200).json({ status: 'success', data: tempat_simpan });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Gagal mengambil data tempat simpan' });
  }
};

export const getReferensiUserRole = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const user_role = await UserRole.findAll();
    return res.status(200).json({ status: 'success', data: user_role });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Gagal mengambil data user role' });
  }
};

// =====================================================================
// FUNGSI UNTUK MENGUPDATE DATA REFERENSI (UPDATE)
// =====================================================================

export const updateReferensiToko = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { toko_name } = req.body;
    
    await Toko.update({ toko_name }, { where: { toko_id: id } });
    
    return res.status(200).json({ status: 'success', message: 'Data toko berhasil diperbarui' });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Gagal memperbarui data toko', error: error.message });
  }
};

export const updateReferensiSatuan = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { satuan_name } = req.body;
    
    await Satuan.update({ satuan_name }, { where: { satuan_id: id } });
    
    return res.status(200).json({ status: 'success', message: 'Data satuan berhasil diperbarui' });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Gagal memperbarui data satuan', error: error.message });
  }
};

export const updateReferensiKategori = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { kategori_name } = req.body;
    
    await Kategori.update({ kategori_name }, { where: { kategori_id: id } });
    
    return res.status(200).json({ status: 'success', message: 'Data kategori berhasil diperbarui' });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Gagal memperbarui data kategori', error: error.message });
  }
};

export const updateReferensiTempatSimpan = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { ts_name } = req.body;
    
    await TempatSimpan.update({ ts_name }, { where: { ts_id: id } });
    
    return res.status(200).json({ status: 'success', message: 'Data tempat simpan berhasil diperbarui' });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Gagal memperbarui data tempat simpan', error: error.message });
  }
};

export const updateReferensiUserRole = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { ur_name } = req.body;
    
    await UserRole.update({ ur_name }, { where: { ur_id: id } });
    
    return res.status(200).json({ status: 'success', message: 'Data user role berhasil diperbarui' });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Gagal memperbarui data user role', error: error.message });
  }
};