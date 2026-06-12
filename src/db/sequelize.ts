import { Sequelize } from 'sequelize';
import config from '../config/config';

// Ambil environment saat ini
const env = process.env.NODE_ENV || 'development';

// Ambil config berdasarkan env, jika tidak ada gunakan development
const dbConfig = config[env] || config['development'];

if (!dbConfig) {
  throw new Error(`Database configuration not found for environment from sequelize "${env}"`);
}

if (!dbConfig.dialect) {
  throw new Error(`Database dialect tidak ditemukan untuk environment dari sequelize "${env}"`);
}

// Inisialisasi Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port ?? 5432,         // Mencegah 'undefined' masuk ke properti port
    logging: dbConfig.logging ?? false,  // Mencegah 'undefined' masuk ke properti logging
  }
);

export default sequelize;