import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';

export interface BarangMasukAttributes {
  bm_id: number;
  bm_name: string;
  bm_date: Date;
  toko_id: number;
  created_at?: Date;
  created_by?: number;
  updated_at?: Date;
  updated_by?: number;
}

export interface BarangMasukCreationAttributes extends Optional<BarangMasukAttributes, 'bm_id' | 'created_at'> {}

class BarangMasuk extends Model<BarangMasukAttributes, BarangMasukCreationAttributes> implements BarangMasukAttributes {
  public bm_id!: number;
  public bm_name!: string;
  public bm_date!: Date;
  public toko_id!: number;
  public created_at!: Date;
  public created_by!: number;
  public updated_at!: Date;
  public updated_by!: number;
}

BarangMasuk.init(
  {
    bm_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bm_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    bm_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    toko_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'barang_masuk',
    timestamps: false, // Diset false karena kita mapping created_at & updated_at secara manual sesuai SQL
    underscored: true,
    modelName: 'BarangMasuk',
  }
);

export default BarangMasuk;