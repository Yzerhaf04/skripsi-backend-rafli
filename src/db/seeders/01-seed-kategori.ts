import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('kategori', [
      { kategori_id: 1, kategori_name: 'Sayuran' },
      { kategori_id: 2, kategori_name: 'Minuman' },
      { kategori_id: 3, kategori_name: 'Bumbu Kering' },
      { kategori_id: 4, kategori_name: 'Bumbu Basah' },
      { kategori_id: 5, kategori_name: 'Utama' },
    ]);
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('kategori', {});
  }
};