import dotenv from 'dotenv';
import path from 'path';
import { Options } from 'sequelize';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface DbConfig {
  [key: string]: Options & { username?: string; password?: string; database?: string; host?: string; port?: number };
}

const config: DbConfig = {
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
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '', 
    database: process.env.DB_NAME || 'Migunani_test',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false, 
  },
};

export default config;