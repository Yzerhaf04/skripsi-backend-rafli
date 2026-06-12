import { Router } from 'express';
import validate from '../middleware/validate';
import { loginSchema } from '../schemas/auth.schemas';
import { login } from '../controllers/auth.controller';

const router = Router();

// =====================================================================
// AUTHENTICATION ROUTES (Public)
// =====================================================================

// Endpoint Login (Bisa diakses siapa saja / tanpa token)
router.post('/login', validate(loginSchema), login);

export default router;