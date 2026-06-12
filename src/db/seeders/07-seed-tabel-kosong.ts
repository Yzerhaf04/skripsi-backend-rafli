import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    // Array kosong [] berarti tabel dibiarkan kosong
    await queryInterface.bulkInsert('barang', []);
    
    // Header Transaksi Kosong
    await queryInterface.bulkInsert('barang_masuk', []);
    await queryInterface.bulkInsert('barang_keluar', []);
    await queryInterface.bulkInsert('stok_opname', []);
    
    // Detail Transaksi Kosong
    await queryInterface.bulkInsert('barang_masuk_detail', []);
    await queryInterface.bulkInsert('barang_keluar_detail', []);
    await queryInterface.bulkInsert('stok_opname_detail', []);
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('stok_opname_detail', {});
    await queryInterface.bulkDelete('barang_keluar_detail', {});
    await queryInterface.bulkDelete('barang_masuk_detail', {});
    await queryInterface.bulkDelete('stok_opname', {});
    await queryInterface.bulkDelete('barang_keluar', {});
    await queryInterface.bulkDelete('barang_masuk', {});
    await queryInterface.bulkDelete('barang', {});
  }
};