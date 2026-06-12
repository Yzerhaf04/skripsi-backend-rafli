import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

// 1. BACA .ENV TERLEBIH DAHULU (Paling Atas)
dotenv.config(); 

// 2. BARU IMPORT DATABASE DAN ROUTES SETELAH .ENV TERBACA
import sequelize from './src/db/sequelize'; 
import authRoutes from './src/routes/auth.routes';
import referensiRoutes from './src/routes/referensi.routes';
import adminRoutes from './src/routes/admin.routes';

// 3. INISIALISASI EXPRESS
const app: Application = express();
const port = process.env.PORT || 3000;

// 4. MIDDLEWARE GLOBAL
// Middleware to parse JSON request bodies (Wajib di atas routes!)
app.use(express.json());

// 5. DAFTARKAN ROUTES KE APP EXPRESS
app.use('/api/auth', authRoutes);
app.use('/api/referensi', referensiRoutes);
app.use('/api/admin', adminRoutes);

// Basic health-check route
app.get('/', (req: Request, res: Response) => {
  res.send('Skripsi Backend Rafli is running! | Skripsi Backend Rafli berjalan!');
});

// 6. TEST DATABASE CONNECTION & START SERVER
const startServer = async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully. Koneksi ke database berhasil!');

    // Start listening to the port
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}. Server berjalan di http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();