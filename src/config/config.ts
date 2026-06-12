import dotenv from 'dotenv';
import path from 'path';
import { Options } from 'sequelize';

// Ambil .env dari root directory (tempat command npm run dev/start dijalankan)
// Ini jauh lebih aman saat aplikasi di-compile ke JavaScript (.js)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Kita definisikan interface yang mewajibkan properti utama berjenis string (bukan undefined)
interface StrictDbConfig {
  [key: string]: Options & {
    database: string;
    username: string;
    host: string;
  };
}

const config: StrictDbConfig = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '', 
    database: process.env.DB_NAME || 'Migunani',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false, 
  },
  test: {
    username: process.env.DB_USER_TEST || 'postgres', // Sebaiknya bedakan env untuk test jika ada
    password: process.env.DB_PASSWORD_TEST || '', 
    database: process.env.DB_NAME_TEST || 'Migunani_test',
    host: process.env.DB_HOST_TEST || 'localhost',
    port: Number(process.env.DB_PORT_TEST) || 5432,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DB_USER_PROD || 'postgres',
    password: process.env.DB_PASSWORD_PROD || '',
    database: process.env.DB_NAME_PROD || 'Migunani',
    host: process.env.DB_HOST_PROD || 'localhost',
    port: Number(process.env.DB_PORT_PROD) || 5432,
    dialect: 'postgres',
    logging: false, 
  },
};

export default config;