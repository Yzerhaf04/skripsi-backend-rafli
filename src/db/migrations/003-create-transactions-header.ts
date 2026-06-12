import { QueryInterface, DataTypes } from 'sequelize';

const headerAttributes = {
  created_at: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
  created_by: { 
    type: DataTypes.INTEGER, allowNull: true,
    references: { model: 'user_list', key: 'ul_id' },
    onUpdate: 'CASCADE', onDelete: 'RESTRICT'
  },
  updated_at: { type: DataTypes.DATE, allowNull: true },
  updated_by: { 
    type: DataTypes.INTEGER, allowNull: true,
    references: { model: 'user_list', key: 'ul_id' },
    onUpdate: 'CASCADE', onDelete: 'RESTRICT'
  }
};

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('stok_opname', {
      so_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      so_name: { type: DataTypes.STRING(50), allowNull: false },
      so_date: { type: DataTypes.DATEONLY, allowNull: false },
      toko_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'toko', key: 'toko_id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
      ...headerAttributes
    });

    await queryInterface.createTable('barang_keluar', {
      bk_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      bk_name: { type: DataTypes.STRING(50), allowNull: false },
      bk_date: { type: DataTypes.DATEONLY, allowNull: false },
      toko_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'toko', key: 'toko_id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
      ...headerAttributes
    });

    await queryInterface.createTable('barang_masuk', {
      bm_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      bm_name: { type: DataTypes.STRING(50), allowNull: false },
      bm_date: { type: DataTypes.DATEONLY, allowNull: false },
      toko_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'toko', key: 'toko_id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
      ...headerAttributes
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('barang_masuk');
    await queryInterface.dropTable('barang_keluar');
    await queryInterface.dropTable('stok_opname');
  }
};