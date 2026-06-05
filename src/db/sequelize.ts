import { Sequelize } from 'sequelize';
import config from '../config/config'; // Import konfigurasi

// Ambil environment saat ini (dari .env NODE_ENV)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

// Inisialisasi Sequelize menggunakan variabel dari config/.env
const sequelize = new Sequelize(
  dbConfig.database as string,
  dbConfig.username as string,
  dbConfig.password as string,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect as any,
    port: dbConfig.port as number,
    logging: dbConfig.logging,
  }
);

export default sequelize;