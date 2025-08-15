import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class NotesModel extends Model<InferAttributes<NotesModel>, InferCreationAttributes<NotesModel>> {
  declare id: CreationOptional<number>
  static associate({ models }: iModels.Database) {
  }
}

export function getNotesModel(sequelize: Sequelize) {
  NotesModel.init(
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
      tableName: "notes",
      modelName: "NotesModel"
    }
  )
  return NotesModel
}