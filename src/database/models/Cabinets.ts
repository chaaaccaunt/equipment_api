import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { EquipmentsModel } from "./Equipments";
import { PersonalModel } from "./Personal";

export class CabinetsModel extends Model<InferAttributes<CabinetsModel>, InferCreationAttributes<CabinetsModel>> {
  declare id: CreationOptional<number>
  declare number: number

  declare responsibleId: ForeignKey<PersonalModel["id"] | undefined>

  static associate({ models }: iModels.Database) {
    this.belongsTo(models.Personals, { foreignKey: "responsibleId", as: "responsible", onDelete: "NO ACTION" })
    this.hasMany(models.Equipments, { foreignKey: "cabinetId", as: "equips", onDelete: "SET NULL" })
  }

  declare equips: NonAttribute<EquipmentsModel[]>
  declare responsible: NonAttribute<PersonalModel>

  declare static associations: {
    equips: Association<CabinetsModel, EquipmentsModel>
    responsible: Association<CabinetsModel, PersonalModel>
  };
}

export function getCabinetsModel(sequelize: Sequelize) {
  CabinetsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      responsibleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: "cabinets",
      modelName: "CabinetsModel"
    }
  )
  return CabinetsModel
}