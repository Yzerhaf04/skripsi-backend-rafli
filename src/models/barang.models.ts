import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';

export interface BarangAttributes {
  barang_id: number;
  barang_name: string;
  kategori_id: number;
  satuan_id: number;
  ts_id: number; // Tambahan: Tempat Simpan ID
}

export interface BarangCreationAttributes extends Optional<BarangAttributes, 'barang_id'> {}

class Barang extends Model<BarangAttributes, BarangCreationAttributes> implements BarangAttributes {
  public barang_id!: number;
  public barang_name!: string;
  public kategori_id!: number;
  public satuan_id!: number;
  public ts_id!: number;
}

Barang.init(
  {
    barang_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    barang_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    kategori_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    satuan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ts_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'barang',
    timestamps: false,
    underscored: true,
    modelName: 'Barang',
  }
);

export default Barang;