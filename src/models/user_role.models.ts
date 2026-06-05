import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';

export interface UserRoleAttributes {
  ur_id: number;
  ur_name: string;
}

export interface UserRoleCreationAttributes extends Optional<UserRoleAttributes, 'ur_id'> {}

class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> implements UserRoleAttributes {
  public ur_id!: number;
  public ur_name!: string;
}

UserRole.init(
  {
    ur_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ur_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user_role',
    timestamps: false,
    underscored: true,
    modelName: 'UserRole',
  }
);

export default UserRole;