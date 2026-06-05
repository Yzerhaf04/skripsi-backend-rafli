import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';

export interface BarangKeluarAttributes {
  bk_id: number;
  bk_name: string;
  bk_date: Date;
  toko_id: number;
  created_at?: Date;
  created_by?: number;
  updated_at?: Date;
  updated_by?: number;
}

export interface BarangKeluarCreationAttributes extends Optional<BarangKeluarAttributes, 'bk_id' | 'created_at'> {}

class BarangKeluar extends Model<BarangKeluarAttributes, BarangKeluarCreationAttributes> implements BarangKeluarAttributes {
  public bk_id!: number;
  public bk_name!: string;
  public bk_date!: Date;
  public toko_id!: number;
  public created_at!: Date;
  public created_by!: number;
  public updated_at!: Date;
  public updated_by!: number;
}

BarangKeluar.init(
  {
    bk_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bk_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    bk_date: {
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
    tableName: 'barang_keluar',
    timestamps: false, // Diset false karena kita mapping created_at & updated_at secara manual sesuai SQL
    underscored: true,
    modelName: 'BarangKeluar',
  }
);

export default BarangKeluar;