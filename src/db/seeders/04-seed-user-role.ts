import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('user_role', [
      { ur_id: 1, ur_name: 'Admin' },
      { ur_id: 2, ur_name: 'Owner' },
      { ur_id: 3, ur_name: 'Kasir' },
    ]);
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('user_role', {});
  }
};