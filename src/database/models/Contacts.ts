import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class ContactsModel extends Model<InferAttributes<ContactsModel>, InferCreationAttributes<ContactsModel>> {
  declare id: CreationOptional<number>

  static associate({ models }: iModels.Database) { }
}

export function getContactsModel(sequelize: Sequelize) {
  ContactsModel.init(
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
      tableName: "contacts",
      modelName: "ContactsModel"
    }
  )
  return ContactsModel
}