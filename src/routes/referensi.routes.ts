import { Router } from 'express';
import { verifyToken, requireRole } from '../middleware/auth.middleware';
import validate from '../middleware/validate';

// Import Controller
import {
  getSemuaReferensi, getReferensiToko, getReferensiSatuan, getReferensiKategori, getReferensiTempatSimpan, getReferensiUserRole,
  updateReferensiToko, updateReferensiSatuan, updateReferensiKategori, updateReferensiTempatSimpan, updateReferensiUserRole
} from '../controllers/referensi.controller';

// Import Schema
import {
  tokoSchema, satuanSchema, kategoriSchema, tempatSimpanSchema, userRoleSchema
} from '../schemas/referensi.schemas';

const router = Router();

// =====================================================================
// MIDDLEWARE GLOBAL UNTUK ROUTE INI
// Pastikan user sudah login & boleh diakses semua role (1: Admin, 2: Owner, 3: Kasir)
// =====================================================================
router.use(verifyToken);
router.use(requireRole([1, 2, 3]));

// =====================================================================
// GET ROUTES (Melihat Data Referensi)
// =====================================================================
router.get('/all', getSemuaReferensi);
router.get('/toko', getReferensiToko);
router.get('/satuan', getReferensiSatuan);
router.get('/kategori', getReferensiKategori);
router.get('/tempat-simpan', getReferensiTempatSimpan);
router.get('/user-role', getReferensiUserRole);

// =====================================================================
// UPDATE ROUTES (Mengubah Data Referensi)
// =====================================================================
router.put('/toko/:id', validate(tokoSchema), updateReferensiToko);
router.put('/satuan/:id', validate(satuanSchema), updateReferensiSatuan);
router.put('/kategori/:id', validate(kategoriSchema), updateReferensiKategori);
router.put('/tempat-simpan/:id', validate(tempatSimpanSchema), updateReferensiTempatSimpan);
router.put('/user-role/:id', validate(userRoleSchema), updateReferensiUserRole);

export default router;