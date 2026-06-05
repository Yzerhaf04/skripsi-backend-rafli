import { Router } from 'express';
import validate from '../middleware/validate';
import { loginSchema } from '../schemas/auth.schemas';
import { login } from '../controllers/auth.controller';

const router = Router();

// Endpoint Login (POST /api/auth/login)
// Ingat: Tidak ada verifyToken di sini karena user justru sedang meminta token
router.post('/login', validate(loginSchema), login);

export default router;