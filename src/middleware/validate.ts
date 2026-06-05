import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError, ZodIssue } from 'zod';

/**
 * Middleware untuk memvalidasi request body menggunakan Zod Schema
 */
const validate = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // parse akan melempar error jika validasi gagal
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Menggunakan .issues dan mendefinisikan tipe ZodIssue pada err
        const errorMessages = error.issues.map((err: ZodIssue) => {
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