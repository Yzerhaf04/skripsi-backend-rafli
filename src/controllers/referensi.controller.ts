import { Request, Response } from 'express';
// Pastikan path import ini disesuaikan dengan struktur folder Anda
import Toko from '../models/toko.models'; 
import Satuan from '../models/satuan.models';
import Kategori from '../models/kategori.models';

export const getSemuaReferensi = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    // Mengambil semua data secara paralel agar proses lebih cepat
    const [toko, satuan, kategori] = await Promise.all([
      Toko.findAll(),
      Satuan.findAll(),
      Kategori.findAll(),
    ]);

    // Mengembalikan response dengan format JSON
    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data referensi',
      data: {
        toko,
        satuan,
        kategori,
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

// --- (Opsional) Jika Anda butuh endpoint yang terpisah satu per satu ---

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