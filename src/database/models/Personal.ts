import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class PersonalModel extends Model<InferAttributes<PersonalModel>, InferCreationAttributes<PersonalModel>> {
  declare id: CreationOptional<number>
  declare firstName: string
  declare lastName: string
  declare surName: string | null
  declare position: string | null

  declare fullName: string
  declare shortName: string

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
      position: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          const fn = this.getDataValue("firstName");
          const ln = this.getDataValue("lastName");
          const sn = this.getDataValue("surName");
          return sn ? `${ln} ${fn} ${sn}` : `${ln} ${fn}`;
        },
      },
      shortName: {
        type: DataTypes.VIRTUAL,
        get() {
          const fn = this.getDataValue("firstName");
          const ln = this.getDataValue("lastName");
          const sn = this.getDataValue("surName");
          return sn ? `${ln} ${fn[0]}. ${sn[0]}.` : `${ln} ${fn[0]}.`;
        },
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