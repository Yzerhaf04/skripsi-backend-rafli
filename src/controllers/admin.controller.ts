import { Response } from 'express';
import sequelize from '../db/sequelize';
import { AuthRequest } from '../middleware/auth.middleware';

// Import Models
import UserList from '../models/user_list.models';
import Toko from '../models/toko.models';
import BarangMasuk from '../models/barang_masuk.models';
import BarangMasukDetail from '../models/barang_masuk_detail.models';
import BarangKeluar from '../models/barang_keluar.models';
import BarangKeluarDetail from '../models/barang_keluar_detail.models';
import StokOpname from '../models/stok_opname.models';
import StokOpnameDetail from '../models/stok_opname_detail.models';

/* =====================================================================
   1. USER MANAGEMENT (CREATE, READ, UPDATE, DELETE)
   ===================================================================== */

// --- READ: Mengambil semua data user ---
export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await UserList.findAll({
      attributes: { exclude: ['ul_password'] }
    });
    res.status(200).json({ status: 'success', data: users });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Gagal mengambil data user', error: error.message });
  }
};

// --- READ: Mengambil satu data user berdasarkan ID ---
export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const user = await UserList.findByPk(id, {
      attributes: { exclude: ['ul_password'] }
    });

    if (!user) {
      res.status(404).json({ status: 'error', message: 'User tidak ditemukan' });
      return; 
    }

    res.status(200).json({ status: 'success', data: user });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Gagal mengambil data detail user', error: error.message });
  }
};

// --- CREATE: Membuat user baru ---
export const createUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { ul_name, ul_password, ur_id } = req.body;
    const newUser = await UserList.create({ ul_name, ul_password, ur_id });
    
    const { ul_password: _, ...userData } = newUser.toJSON();
    
    res.status(201).json({ status: 'success', message: 'User berhasil dibuat', data: userData });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Gagal membuat user', error: error.message });
  }
};

// --- UPDATE: Mengubah data user ---
export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { ul_name, ul_password, ur_id } = req.body;
    
    await UserList.update(
      { ul_name, ul_password, ur_id },
      { where: { ul_id: id } }
    );
    res.status(200).json({ status: 'success', message: 'User berhasil diperbarui' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Gagal memperbarui user', error: error.message });
  }
};

// --- DELETE: Menghapus data user ---
export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await UserList.destroy({ where: { ul_id: id } });
    res.status(200).json({ status: 'success', message: 'User berhasil dihapus' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Gagal menghapus user', error: error.message });
  }
};

/* =====================================================================
   2. BARANG MASUK
   ===================================================================== */

export const createBarangMasuk = async (req: AuthRequest, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const { bm_name, bm_date, toko_id, details } = req.body;
    const created_by = req.user?.ul_id;

    const toko = await Toko.findByPk(toko_id, { transaction });
    const user = await UserList.findByPk(created_by, { transaction });

    if (!toko || !user) {
      throw new Error('Data Toko atau User tidak ditemukan');
    }

    const generated_bm_name = `Barang Masuk ${bm_name} - ${toko.toko_name}`;

    const bmHeader = await BarangMasuk.create(
      { bm_name: generated_bm_name, bm_date, toko_id, created_by }, 
      { transaction }
    );

    const bmDetailsData = details.map((detail: any) => ({
      bm_id: bmHeader.bm_id,
      barang_id: detail.barang_id,
      jumlah_barang: detail.jumlah_barang,
    }));

    await BarangMasukDetail.bulkCreate(bmDetailsData, { transaction });

    await transaction.commit();
    res.status(201).json({ status: 'success', message: 'Data Barang Masuk berhasil ditambahkan' });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({ status: 'error', message: 'Gagal menambah Barang Masuk', error: error.message });
  }
};

export const updateBarangMasuk = async (req: AuthRequest, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const id = Number(req.params.id);
    const { bm_name, bm_date, toko_id, details } = req.body;
    const updated_by = req.user?.ul_id;

    await BarangMasuk.update(
      { bm_name, bm_date, toko_id, updated_by, updated_at: new Date() },
      { where: { bm_id: id }, transaction }
    );

    await BarangMasukDetail.destroy({ where: { bm_id: id }, transaction });
    
    const bmDetailsData = details.map((detail: any) => ({
      bm_id: id,
      barang_id: detail.barang_id,
      jumlah_barang: detail.jumlah_barang,
    }));
    await BarangMasukDetail.bulkCreate(bmDetailsData, { transaction });

    await transaction.commit();
    res.status(200).json({ status: 'success', message: 'Data Barang Masuk berhasil diperbarui' });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({ status: 'error', message: 'Gagal memperbarui Barang Masuk', error: error.message });
  }
};

export const deleteBarangMasuk = async (req: AuthRequest, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const id = Number(req.params.id);
    await BarangMasuk.destroy({ where: { bm_id: id }, transaction });
    await transaction.commit();
    res.status(200).json({ status: 'success', message: 'Data Barang Masuk berhasil dihapus' });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({ status: 'error', message: 'Gagal menghapus Barang Masuk', error: error.message });
  }
};

/* =====================================================================
   3. BARANG KELUAR
   ===================================================================== */

export const createBarangKeluar = async (req: AuthRequest, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const { bk_name, bk_date, toko_id, details } = req.body;
    const created_by = req.user?.ul_id;

    const toko = await Toko.findByPk(toko_id, { transaction });
    const user = await UserList.findByPk(created_by, { transaction });

    if (!toko || !user) {
      throw new Error('Data Toko atau User tidak ditemukan');
    }

    // DISESUAIKAN: Format dibuat sama persis dengan Barang Masuk
    const generated_bk_name = `Barang Keluar ${bk_name} - ${toko.toko_name}`;

    const bkHeader = await BarangKeluar.create(
      { bk_name: generated_bk_name, bk_date, toko_id, created_by }, 
      { transaction }
    );

    const bkDetailsData = details.map((detail: any) => ({
      bk_id: bkHeader.bk_id,
      barang_id: detail.barang_id,
      jumlah_barang: detail.jumlah_barang,
    }));

    await BarangKeluarDetail.bulkCreate(bkDetailsData, { transaction });
    await transaction.commit();
    res.status(201).json({ status: 'success', message: 'Data Barang Keluar berhasil ditambahkan' });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({ status: 'error', message: 'Gagal menambah Barang Keluar', error: error.message });
  }
};

export const updateBarangKeluar = async (req: AuthRequest, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const id = Number(req.params.id);
    const { bk_name, bk_date, toko_id, details } = req.body;
    const updated_by = req.user?.ul_id;

    await BarangKeluar.update(
      { bk_name, bk_date, toko_id, updated_by, updated_at: new Date() },
      { where: { bk_id: id }, transaction }
    );

    await BarangKeluarDetail.destroy({ where: { bk_id: id }, transaction });
    const bkDetailsData = details.map((detail: any) => ({
      bk_id: id,
      barang_id: detail.barang_id,
      jumlah_barang: detail.jumlah_barang,
    }));
    await BarangKeluarDetail.bulkCreate(bkDetailsData, { transaction });

    await transaction.commit();
    res.status(200).json({ status: 'success', message: 'Data Barang Keluar berhasil diperbarui' });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({ status: 'error', message: 'Gagal memperbarui Barang Keluar', error: error.message });
  }
};

export const deleteBarangKeluar = async (req: AuthRequest, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const id = Number(req.params.id);
    await BarangKeluar.destroy({ where: { bk_id: id }, transaction });
    await transaction.commit();
    res.status(200).json({ status: 'success', message: 'Data Barang Keluar berhasil dihapus' });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({ status: 'error', message: 'Gagal menghapus Barang Keluar', error: error.message });
  }
};

/* =====================================================================
   4. STOK OPNAME
   ===================================================================== */

export const createStokOpname = async (req: AuthRequest, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const { so_name, so_date, toko_id, details } = req.body;
    const created_by = req.user?.ul_id;

    const toko = await Toko.findByPk(toko_id, { transaction });
    const user = await UserList.findByPk(created_by, { transaction });

    if (!toko || !user) {
      throw new Error('Data Toko atau User tidak ditemukan');
    }

    // DISESUAIKAN: Format dibuat sama persis dengan Barang Masuk
    const generated_so_name = `Stok Opname ${so_name} - ${toko.toko_name}`;

    const soHeader = await StokOpname.create(
      { so_name: generated_so_name, so_date, toko_id, created_by }, 
      { transaction }
    );

    const soDetailsData = details.map((detail: any) => ({
      so_id: soHeader.so_id,
      barang_id: detail.barang_id,
      jumlah_barang: detail.jumlah_barang,
    }));

    await StokOpnameDetail.bulkCreate(soDetailsData, { transaction });
    await transaction.commit();
    res.status(201).json({ status: 'success', message: 'Data Stok Opname berhasil ditambahkan' });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({ status: 'error', message: 'Gagal menambah Stok Opname', error: error.message });
  }
};

export const updateStokOpname = async (req: AuthRequest, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const id = Number(req.params.id);
    const { so_name, so_date, toko_id, details } = req.body;
    const updated_by = req.user?.ul_id;

    await StokOpname.update(
      { so_name, so_date, toko_id, updated_by, updated_at: new Date() },
      { where: { so_id: id }, transaction }
    );

    await StokOpnameDetail.destroy({ where: { so_id: id }, transaction });
    const soDetailsData = details.map((detail: any) => ({
      so_id: id,
      barang_id: detail.barang_id,
      jumlah_barang: detail.jumlah_barang,
    }));
    await StokOpnameDetail.bulkCreate(soDetailsData, { transaction });

    await transaction.commit();
    res.status(200).json({ status: 'success', message: 'Data Stok Opname berhasil diperbarui' });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({ status: 'error', message: 'Gagal memperbarui Stok Opname', error: error.message });
  }
};

export const deleteStokOpname = async (req: AuthRequest, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const id = Number(req.params.id);
    await StokOpname.destroy({ where: { so_id: id }, transaction });
    await transaction.commit();
    res.status(200).json({ status: 'success', message: 'Data Stok Opname berhasil dihapus' });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({ status: 'error', message: 'Gagal menghapus Stok Opname', error: error.message });
  }
};