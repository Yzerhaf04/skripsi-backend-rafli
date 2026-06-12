import { Options } from 'sequelize';

const config: { [env: string]: Options } = {
  development: {
    username: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? '',
    host: process.env.DB_HOST ?? 'localhost',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER_TEST ?? '',
    password: process.env.DB_PASSWORD_TEST ?? '',
    database: process.env.DB_NAME_TEST ?? '',
    host: process.env.DB_HOST_TEST ?? 'localhost',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DB_USER_PROD ?? '',
    password: process.env.DB_PASSWORD_PROD ?? '',
    database: process.env.DB_NAME_PROD ?? '',
    host: process.env.DB_HOST_PROD ?? '',
    dialect: 'postgres',
    logging: false,
  },
};

// Menggunakan export default agar konsisten dengan ES6 di TypeScript
export default config;