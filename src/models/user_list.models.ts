import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';

export interface UserListAttributes {
  ul_id: number;
  ul_name: string;
  ul_password: string;
  ur_id: number;
}

export interface UserListCreationAttributes extends Optional<UserListAttributes, 'ul_id'> {}

class UserList extends Model<UserListAttributes, UserListCreationAttributes> implements UserListAttributes {
  public ul_id!: number;
  public ul_name!: string;
  public ul_password!: string;
  public ur_id!: number;
}

UserList.init(
  {
    ul_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ul_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ul_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user_list',
    timestamps: false,
    underscored: true,
    modelName: 'UserList',
  }
);

export default UserList;