import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('toko', [
      { toko_id: 1, toko_name: 'Cabang Kampung Hutan' },
      { toko_id: 2, toko_name: 'Cabang Bintaro Kesehatan' },
      { toko_id: 3, toko_name: 'Cabang BSD Cordoba' },
    ]);
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('toko', {});
  }
};