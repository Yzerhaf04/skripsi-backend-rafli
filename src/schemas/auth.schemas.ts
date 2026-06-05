import { z } from 'zod';

export const loginSchema = z.object({
  ul_name: z
    .string({ message: 'Username wajib diisi' })
    .min(1, 'Username tidak boleh kosong'),
  ul_password: z
    .string({ message: 'Password wajib diisi' })
    .min(1, 'Password tidak boleh kosong'),
});