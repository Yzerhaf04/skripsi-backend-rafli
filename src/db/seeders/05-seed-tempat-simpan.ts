import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('tempat_simpan', [
      { ts_id: 1, ts_name: 'Freezer' },
      { ts_id: 2, ts_name: 'Kulkas' },
      { ts_id: 3, ts_name: 'Showcase' },
      { ts_id: 4, ts_name: 'Rak/Lemari Kering' },
    ]);
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('tempat_simpan', {});
  }
};