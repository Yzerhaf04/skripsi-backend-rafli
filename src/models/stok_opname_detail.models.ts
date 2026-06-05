import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';

export interface StokOpnameDetailAttributes {
  sod_id: number;
  so_id: number;
  barang_id: number;
  jumlah_barang: number;
}

export interface StokOpnameDetailCreationAttributes extends Optional<StokOpnameDetailAttributes, 'sod_id'> {}

class StokOpnameDetail extends Model<StokOpnameDetailAttributes, StokOpnameDetailCreationAttributes> implements StokOpnameDetailAttributes {
  public sod_id!: number;
  public so_id!: number;
  public barang_id!: number;
  public jumlah_barang!: number;
}

StokOpnameDetail.init(
  {
    sod_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    so_id: {
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
    tableName: 'stok_opname_detail',
    timestamps: false,
    underscored: true,
    modelName: 'StokOpnameDetail',
  }
);

export default StokOpnameDetail;