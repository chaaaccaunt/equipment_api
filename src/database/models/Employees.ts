import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class EmployeeModel extends Model<InferAttributes<EmployeeModel>, InferCreationAttributes<EmployeeModel>> {
  declare id: CreationOptional<number>
  static associate({ models }: iModels.Database) {
  }
}

export function getEmployeeModel(sequelize: Sequelize) {
  EmployeeModel.init(
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
      tableName: "employee",
      modelName: "EmployeeModel"
    }
  )
  return EmployeeModel
}