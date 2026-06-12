import { Router } from 'express';
import { verifyToken, requireRole } from '../middleware/auth.middleware';
import validate from '../middleware/validate';

// Import Controllers
import {
  getAllUsers, getUserById, createUser, updateUser, deleteUser,
  createBarangMasuk, updateBarangMasuk, deleteBarangMasuk,
  createBarangKeluar, updateBarangKeluar, deleteBarangKeluar,
  createStokOpname, updateStokOpname, deleteStokOpname
} from '../controllers/admin.controller';

// Import Schemas
import {
  createUserSchema, updateUserSchema,
  barangMasukSchema, barangKeluarSchema, stokOpnameSchema
} from '../schemas/admin.schemas';

const router = Router();

// =====================================================================
// MIDDLEWARE GLOBAL UNTUK ROUTE INI
// Pastikan user sudah login & HANYA ROLE ADMIN (ur_id: 1) yang bisa masuk
// =====================================================================
router.use(verifyToken);
router.use(requireRole([1]));

// =====================================================================
// USER MANAGEMENT ROUTES
// =====================================================================
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', validate(createUserSchema), createUser);
router.put('/users/:id', validate(updateUserSchema), updateUser);
router.delete('/users/:id', deleteUser);

// =====================================================================
// BARANG MASUK ROUTES
// =====================================================================
router.post('/barang-masuk', validate(barangMasukSchema), createBarangMasuk);
router.put('/barang-masuk/:id', validate(barangMasukSchema), updateBarangMasuk);
router.delete('/barang-masuk/:id', deleteBarangMasuk);

// =====================================================================
// BARANG KELUAR ROUTES
// =====================================================================
router.post('/barang-keluar', validate(barangKeluarSchema), createBarangKeluar);
router.put('/barang-keluar/:id', validate(barangKeluarSchema), updateBarangKeluar);
router.delete('/barang-keluar/:id', deleteBarangKeluar);

// =====================================================================
// STOK OPNAME ROUTES
// =====================================================================
router.post('/stok-opname', validate(stokOpnameSchema), createStokOpname);
router.put('/stok-opname/:id', validate(stokOpnameSchema), updateStokOpname);
router.delete('/stok-opname/:id', deleteStokOpname);

export default router;