import { Sequelize, Options } from 'sequelize';
import config from '../config/config'; // Pastikan path ini mengarah ke file konfigurasi yang benar

// Ambil environment saat ini
const env = process.env.NODE_ENV || 'development';

// Menggunakan Type Assertion 'as Record<string, Options>' agar TypeScript tahu objek ini bisa diindeks dengan string (env)
const currentConfig = (config as Record<string, Options>)[env] || (config as Record<string, Options>)['development'];

// Inisialisasi Sequelize dengan menjamin tidak ada nilai 'undefined' yang lolos
const sequelize = new Sequelize(
  currentConfig.database ?? '',
  currentConfig.username ?? '',
  currentConfig.password ?? '',
  {
    host: currentConfig.host ?? 'localhost',
    dialect: currentConfig.dialect,
    port: currentConfig.port ? Number(currentConfig.port) : 5432,
    logging: currentConfig.logging ?? false,
  }
);

export default sequelize;