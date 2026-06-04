import dotenv from 'dotenv';
import path from 'path';
import { Options } from 'sequelize';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Define an interface for the config objects
interface DbConfig {
  [key: string]: Options;
}

const config: DbConfig = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'Migunani',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: console.log, // Enable logging in dev to see SQL queries
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'Migunani_test',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false, // Always disable logging in production for security/performance
  },
};

export default config;