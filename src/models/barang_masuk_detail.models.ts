import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';

export interface BarangMasukDetailAttributes {
  bmd_id: number;
  bm_id: number;
  barang_id: number;
  jumlah_barang: number;
}

export interface BarangMasukDetailCreationAttributes extends Optional<BarangMasukDetailAttributes, 'bmd_id'> {}

class BarangMasukDetail extends Model<BarangMasukDetailAttributes, BarangMasukDetailCreationAttributes> implements BarangMasukDetailAttributes {
  public bmd_id!: number;
  public bm_id!: number;
  public barang_id!: number;
  public jumlah_barang!: number;
}

BarangMasukDetail.init(
  {
    bmd_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    barang_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_barang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'barang_masuk_detail',
    timestamps: false,
    underscored: true,
    modelName: 'BarangMasukDetail',
  }
);

export default BarangMasukDetail;