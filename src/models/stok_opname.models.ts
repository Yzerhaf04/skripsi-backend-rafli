import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';

export interface StokOpnameAttributes {
  so_id: number;
  so_name: string;
  so_date: Date;
  toko_id: number;
  created_at?: Date;
  created_by?: number;
  updated_at?: Date;
  updated_by?: number;
}

export interface StokOpnameCreationAttributes extends Optional<StokOpnameAttributes, 'so_id' | 'created_at'> {}

class StokOpname extends Model<StokOpnameAttributes, StokOpnameCreationAttributes> implements StokOpnameAttributes {
  public so_id!: number;
  public so_name!: string;
  public so_date!: Date;
  public toko_id!: number;
  public created_at!: Date;
  public created_by!: number;
  public updated_at!: Date;
  public updated_by!: number;
}

StokOpname.init(
  {
    so_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    so_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    so_date: {
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
    tableName: 'stok_opname',
    timestamps: false, // Diset false karena kita mapping created_at & updated_at secara manual sesuai SQL
    underscored: true,
    modelName: 'StokOpname',
  }
);

export default StokOpname;