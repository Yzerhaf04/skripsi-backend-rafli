import { z } from 'zod';

// =====================================================================
// SCHEMA UNTUK UPDATE REFERENSI TOKO
// =====================================================================
export const tokoSchema = z.object({
  toko_name: z
    .string({ message: 'Nama toko wajib diisi' })
    .min(1, 'Nama toko tidak boleh kosong')
    .max(100, 'Nama toko maksimal 100 karakter'),
});

// =====================================================================
// SCHEMA UNTUK UPDATE REFERENSI SATUAN
// =====================================================================
export const satuanSchema = z.object({
  satuan_name: z
    .string({ message: 'Nama satuan wajib diisi' })
    .min(1, 'Nama satuan tidak boleh kosong')
    .max(50, 'Nama satuan maksimal 50 karakter'),
});

// =====================================================================
// SCHEMA UNTUK UPDATE REFERENSI KATEGORI
// =====================================================================
export const kategoriSchema = z.object({
  kategori_name: z
    .string({ message: 'Nama kategori wajib diisi' })
    .min(1, 'Nama kategori tidak boleh kosong')
    .max(50, 'Nama kategori maksimal 50 karakter'),
});

// =====================================================================
// SCHEMA UNTUK UPDATE REFERENSI TEMPAT SIMPAN
// =====================================================================
export const tempatSimpanSchema = z.object({
  ts_name: z
    .string({ message: 'Nama tempat simpan wajib diisi' })
    .min(1, 'Nama tempat simpan tidak boleh kosong')
    .max(100, 'Nama tempat simpan maksimal 100 karakter'),
});

// =====================================================================
// SCHEMA UNTUK UPDATE REFERENSI USER ROLE
// =====================================================================
export const userRoleSchema = z.object({
  ur_name: z
    .string({ message: 'Nama role wajib diisi' })
    .min(1, 'Nama role tidak boleh kosong')
    .max(50, 'Nama role maksimal 50 karakter'),
});