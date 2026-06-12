import { z } from 'zod';

// =====================================================================
// 1. SCHEMA UNTUK USER MANAGEMENT
// =====================================================================

// Skema untuk CREATE (Membuat user baru -> Password Wajib)
export const createUserSchema = z.object({
  ul_name: z
    .string({ message: 'Nama user wajib diisi' })
    .min(1, 'Nama user tidak boleh kosong')
    .max(100, 'Nama user maksimal 100 karakter'),
  ul_password: z
    .string({ message: 'Password wajib diisi' })
    .min(6, 'Password minimal 6 karakter')
    .max(255, 'Password maksimal 255 karakter'),
  ur_id: z
    .number({ message: 'Role ID (ur_id) wajib diisi' })
    .int('Role ID harus berupa angka bulat')
    .positive('Role ID tidak valid'),
});

// Skema untuk UPDATE (Mengubah data user -> Password Opsional)
export const updateUserSchema = z.object({
  ul_name: z
    .string({ message: 'Nama user wajib diisi' })
    .min(1, 'Nama user tidak boleh kosong')
    .max(100, 'Nama user maksimal 100 karakter'),
  ul_password: z
    .string()
    .min(6, 'Password minimal 6 karakter')
    .max(255, 'Password maksimal 255 karakter')
    .optional() // Membuat properti ini boleh tidak dikirim (undefined)
    .or(z.literal('')), // Memperbolehkan string kosong ("") jika frontend tetap mengirimkan field ini tapi isinya kosong
  ur_id: z
    .number({ message: 'Role ID (ur_id) wajib diisi' })
    .int('Role ID harus berupa angka bulat')
    .positive('Role ID tidak valid'),
});


// =====================================================================
// SCHEMA REUSABLE UNTUK DETAIL TRANSAKSI
// Karena BM, BK, dan SO memiliki format detail (list barang) yang sama
// =====================================================================
const transactionDetailSchema = z.object({
  barang_id: z
    .number({ message: 'Barang ID wajib diisi' })
    .int('Barang ID harus berupa angka bulat')
    .positive('Barang ID tidak valid'),
  jumlah_barang: z
    .number({ message: 'Jumlah barang wajib diisi' })
    .int('Jumlah barang harus berupa angka bulat')
    .min(1, 'Jumlah barang minimal 1'), // Tidak boleh 0 atau minus
});


// =====================================================================
// 2. SCHEMA UNTUK BARANG MASUK
// =====================================================================
export const barangMasukSchema = z.object({
  bm_name: z
    .string({ message: 'Nama/Keterangan input wajib diisi' })
    .min(1, 'Nama input tidak boleh kosong')
    .max(50, 'Maksimal 50 karakter'),
  bm_date: z
    .string({ message: 'Tanggal Barang Masuk wajib diisi' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD (Contoh: 2026-06-05)'),
  toko_id: z
    .number({ message: 'Toko ID wajib diisi' })
    .int('Toko ID harus berupa angka bulat')
    .positive('Toko ID tidak valid'),
  details: z
    .array(transactionDetailSchema, { message: 'Daftar barang (details) wajib diisi' })
    .min(1, 'Minimal satu barang harus ditambahkan ke dalam daftar (details)'),
});


// =====================================================================
// 3. SCHEMA UNTUK BARANG KELUAR
// =====================================================================
export const barangKeluarSchema = z.object({
  bk_name: z
    .string({ message: 'Nama/Keterangan input wajib diisi' })
    .min(1, 'Nama input tidak boleh kosong')
    .max(50, 'Maksimal 50 karakter'),
  bk_date: z
    .string({ message: 'Tanggal Barang Keluar wajib diisi' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD (Contoh: 2026-06-05)'),
  toko_id: z
    .number({ message: 'Toko ID wajib diisi' })
    .int('Toko ID harus berupa angka bulat')
    .positive('Toko ID tidak valid'),
  details: z
    .array(transactionDetailSchema, { message: 'Daftar barang (details) wajib diisi' })
    .min(1, 'Minimal satu barang harus ditambahkan ke dalam daftar (details)'),
});


// =====================================================================
// 4. SCHEMA UNTUK STOK OPNAME
// =====================================================================
export const stokOpnameSchema = z.object({
  so_name: z
    .string({ message: 'Nama/Keterangan input wajib diisi' })
    .min(1, 'Nama input tidak boleh kosong')
    .max(50, 'Maksimal 50 karakter'),
  so_date: z
    .string({ message: 'Tanggal Stok Opname wajib diisi' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD (Contoh: 2026-06-05)'),
  toko_id: z
    .number({ message: 'Toko ID wajib diisi' })
    .int('Toko ID harus berupa angka bulat')
    .positive('Toko ID tidak valid'),
  details: z
    .array(transactionDetailSchema, { message: 'Daftar barang (details) wajib diisi' })
    .min(1, 'Minimal satu barang harus ditambahkan ke dalam daftar (details)'),
});