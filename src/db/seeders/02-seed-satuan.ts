import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('satuan', [
      { satuan_id: 1, satuan_name: 'Kg' },
      { satuan_id: 2, satuan_name: 'Liter' },
      { satuan_id: 3, satuan_name: 'Pcs' },
      { satuan_id: 4, satuan_name: 'Pack' },
      { satuan_id: 5, satuan_name: 'Botol' },
      { satuan_id: 6, satuan_name: 'Ekor' },
    ]);
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('satuan', {});
  }
};