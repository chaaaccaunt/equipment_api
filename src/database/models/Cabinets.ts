import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { EquipmentsModel } from "./Equipments";

export class CabinetsModel extends Model<InferAttributes<CabinetsModel>, InferCreationAttributes<CabinetsModel>> {
  declare id: CreationOptional<number>
  declare number: number

  static associate({ models }: iModels.Database) {
    this.hasMany(models.Equipments, { foreignKey: "brandId", as: "equips", onDelete: "NO ACTION" })
  }

  declare equips: NonAttribute<EquipmentsModel[]>

  declare static associations: {
    equips: Association<CabinetsModel, EquipmentsModel>
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
        type: DataTypes.INTEGER,
        allowNull: false
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