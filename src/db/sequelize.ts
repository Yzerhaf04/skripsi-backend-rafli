import { Sequelize } from 'sequelize';

// Sesuaikan password dan host dengan konfigurasi PostgreSQL Anda
const sequelize = new Sequelize('Migunani', 'postgres', '', {
  host: 'localhost', // atau '127.0.0.1'
  dialect: 'postgres',
  port: 5432, // Port default PostgreSQL
  logging: false, // Set true jika ingin melihat query SQL di terminal
});

// WAJIB: Export default agar bisa di-import dengan "import sequelize from ..."
export default sequelize;