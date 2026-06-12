import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('stok_opname_detail', {
      sod_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      so_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'stok_opname', key: 'so_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      barang_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'barang', key: 'barang_id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
      jumlah_barang: { type: DataTypes.INTEGER, allowNull: false },
    });

    await queryInterface.createTable('barang_keluar_detail', {
      bkd_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      bk_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'barang_keluar', key: 'bk_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      barang_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'barang', key: 'barang_id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
      jumlah_barang: { type: DataTypes.INTEGER, allowNull: false },
    });

    await queryInterface.createTable('barang_masuk_detail', {
      bmd_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      bm_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'barang_masuk', key: 'bm_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      barang_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'barang', key: 'barang_id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
      jumlah_barang: { type: DataTypes.INTEGER, allowNull: false },
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('barang_masuk_detail');
    await queryInterface.dropTable('barang_keluar_detail');
    await queryInterface.dropTable('stok_opname_detail');
  }
};