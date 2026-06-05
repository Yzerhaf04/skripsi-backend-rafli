import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';

export interface BarangKeluarDetailAttributes {
  bkd_id: number;
  bk_id: number;
  barang_id: number;
  jumlah_barang: number;
}

export interface BarangKeluarDetailCreationAttributes extends Optional<BarangKeluarDetailAttributes, 'bkd_id'> {}

class BarangKeluarDetail extends Model<BarangKeluarDetailAttributes, BarangKeluarDetailCreationAttributes> implements BarangKeluarDetailAttributes {
  public bkd_id!: number;
  public bk_id!: number;
  public barang_id!: number;
  public jumlah_barang!: number;
}

BarangKeluarDetail.init(
  {
    bkd_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bk_id: {
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
    tableName: 'barang_keluar_detail',
    timestamps: false,
    underscored: true,
    modelName: 'BarangKeluarDetail',
  }
);

export default BarangKeluarDetail;