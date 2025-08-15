import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class TypeofExecutionsModel extends Model<InferAttributes<TypeofExecutionsModel>, InferCreationAttributes<TypeofExecutionsModel>> {
  declare id: CreationOptional<number>
  static associate({ models }: iModels.Database) {
  }
}

export function getTypeofExecutionsModel(sequelize: Sequelize) {
  TypeofExecutionsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: "typeof-executions",
      modelName: "TypeofExecutionsModel"
    }
  )
  return TypeofExecutionsModel
}