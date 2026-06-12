import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('kategori', {
      kategori_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      kategori_name: { type: DataTypes.STRING(50), allowNull: false },
    });

    await queryInterface.createTable('satuan', {
      satuan_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      satuan_name: { type: DataTypes.STRING(50), allowNull: false },
    });

    await queryInterface.createTable('toko', {
      toko_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      toko_name: { type: DataTypes.STRING(50), allowNull: false },
    });

    await queryInterface.createTable('user_role', {
      ur_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      ur_name: { type: DataTypes.STRING(50), allowNull: false },
    });

    await queryInterface.createTable('tempat_simpan', {
      ts_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      ts_name: { type: DataTypes.STRING(100), allowNull: false },
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('tempat_simpan');
    await queryInterface.dropTable('user_role');
    await queryInterface.dropTable('toko');
    await queryInterface.dropTable('satuan');
    await queryInterface.dropTable('kategori');
  }
};