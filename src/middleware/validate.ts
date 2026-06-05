import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Middleware untuk memvalidasi request body menggunakan Zod Schema
 */
const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // parse akan melempar error jika validasi gagal
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Memformat pesan error dari Zod agar mudah dibaca oleh frontend
        const errorMessages = error.errors.map((err) => {
          return `${err.path.join('.')}: ${err.message}`;
        }).join(', ');

        res.status(400).json({
          status: 'error',
          message: 'Validasi input gagal',
          errors: errorMessages,
        });
      } else {
        next(error);
      }
    }
  };
};

export default validate;