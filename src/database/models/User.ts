import { UUID } from "crypto";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare uid: CreationOptional<UUID>
  declare password: string
  declare login: string

  static associate({ models }: iModels.Database) { }
}

export function getUserModel(sequelize: Sequelize) {
  UserModel.init(
    {
      uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "UsersModels"
    }
  )
  return UserModel
}