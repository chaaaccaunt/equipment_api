import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class PersonalModel extends Model<InferAttributes<PersonalModel>, InferCreationAttributes<PersonalModel>> {
  declare id: CreationOptional<number>
  declare firstName: string
  declare lastName: string
  declare surName: string | null

  static associate({ models }: iModels.Database) { }
}

export function getPersonalModel(sequelize: Sequelize) {
  PersonalModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      surName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "personal",
      modelName: "PersonalModel"
    }
  )
  return PersonalModel
}