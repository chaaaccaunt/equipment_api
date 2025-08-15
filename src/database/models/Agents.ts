import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class AgentsModel extends Model<InferAttributes<AgentsModel>, InferCreationAttributes<AgentsModel>> {
  declare id: CreationOptional<number>
  static associate({ models }: iModels.Database) {
  }
}

export function getAgentsModel(sequelize: Sequelize) {
  AgentsModel.init(
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
      tableName: "agents",
      modelName: "AgentsModel"
    }
  )
  return AgentsModel
}