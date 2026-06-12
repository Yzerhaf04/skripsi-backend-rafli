import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';

export default {
  up: async (queryInterface: QueryInterface) => {
    const salt = await bcrypt.genSalt(10);
    
    // Hash password berdasarkan data dari SQL
    const passAdminBella = await bcrypt.hash('admin@bella', salt);
    const passAdmin2 = await bcrypt.hash('admin@2', salt);
    const passOwner1 = await bcrypt.hash('owner@1', salt);
    const passOwner2 = await bcrypt.hash('owner@2', salt);
    const passOwner3 = await bcrypt.hash('owner@3', salt);
    const passKasirKH = await bcrypt.hash('kasir@kampunghutan', salt);
    const passKasirBK = await bcrypt.hash('kasir@bintarokesehatan', salt);
    const passKasirBSD = await bcrypt.hash('kasir@bsdcordoba', salt);

    await queryInterface.bulkInsert('user_list', [
      { ul_id: 1, ul_name: 'admin Bella', ul_password: passAdminBella, ur_id: 1 },
      { ul_id: 2, ul_name: 'admin 2', ul_password: passAdmin2, ur_id: 1 },
      { ul_id: 3, ul_name: 'owner 1', ul_password: passOwner1, ur_id: 2 },
      { ul_id: 4, ul_name: 'owner 2', ul_password: passOwner2, ur_id: 2 },
      { ul_id: 5, ul_name: 'owner 3', ul_password: passOwner3, ur_id: 2 },
      { ul_id: 6, ul_name: 'kasir Kampung Hutan', ul_password: passKasirKH, ur_id: 3 },
      { ul_id: 7, ul_name: 'kasir Bintaro Kesehatan', ul_password: passKasirBK, ur_id: 3 },
      { ul_id: 8, ul_name: 'kasir BSD Cordoba', ul_password: passKasirBSD, ur_id: 3 },
    ]);
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('user_list', {});
  }
};