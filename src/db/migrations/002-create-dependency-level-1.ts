import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('user_list', {
      ul_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      ul_name: { type: DataTypes.STRING(100), allowNull: false },
      ul_password: { type: DataTypes.STRING(255), allowNull: false },
      ur_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'user_role', key: 'ur_id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
    });

    await queryInterface.createTable('barang', {
      barang_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      barang_name: { type: DataTypes.STRING(50), allowNull: false },
      kategori_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'kategori', key: 'kategori_id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
      satuan_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'satuan', key: 'satuan_id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
      ts_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: { model: 'tempat_simpan', key: 'ts_id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('barang');
    await queryInterface.dropTable('user_list');
  }
};