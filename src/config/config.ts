import dotenv from 'dotenv';
import path from 'path';
import { Options } from 'sequelize';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface DbConfig {
  [key: string]: Options;
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
    // Memastikan nilai wajib string dengan 'as string' atau fallback empty string
    username: (process.env.DB_USER || 'postgres') as string,
    password: (process.env.DB_PASSWORD || '') as string,
    database: (process.env.DB_NAME || 'Migunani') as string,
    host: (process.env.DB_HOST || 'localhost') as string,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false, 
  },
};

export default config;