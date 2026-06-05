import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

// 1. BACA .ENV TERLEBIH DAHULU (Paling Atas)
dotenv.config(); 

// 2. BARU IMPORT DATABASE SETELAH .ENV TERBACA
import sequelize from './src/db/sequelize'; 
// (sesuaikan path import sequelize-nya, misal './src/db/sequelize' jika index.ts di root)

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Basic health-check route
app.get('/', (req: Request, res: Response) => {
  res.send('Skripsi Backend Rafli is running! | Skripsi Backend Rafli berjalan!');
});

// Test Database Connection and Start Server
const startServer = async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully. Koneski ke database berhasil!');

    // Start listening to the port
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}. Server berjalan di http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();