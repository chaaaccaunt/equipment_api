import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class EmployeePositionsModel extends Model<InferAttributes<EmployeePositionsModel>, InferCreationAttributes<EmployeePositionsModel>> {
  declare id: CreationOptional<number>

  static associate({ models }: iModels.Database) { }
}

export function getEmployeePositionsModel(sequelize: Sequelize) {
  EmployeePositionsModel.init(
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
      tableName: "employee-positions",
      modelName: "EmployeePositionsModel"
    }
  )
  return EmployeePositionsModel
}