import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';

export interface TempatSimpanAttributes {
  ts_id: number;
  ts_name: string;
}

export interface TempatSimpanCreationAttributes extends Optional<TempatSimpanAttributes, 'ts_id'> {}

class TempatSimpan extends Model<TempatSimpanAttributes, TempatSimpanCreationAttributes> implements TempatSimpanAttributes {
  public ts_id!: number;
  public ts_name!: string;
}

TempatSimpan.init(
  {
    ts_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ts_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tempat_simpan',
    timestamps: false,
    underscored: true,
    modelName: 'TempatSimpan',
  }
);

export default TempatSimpan;