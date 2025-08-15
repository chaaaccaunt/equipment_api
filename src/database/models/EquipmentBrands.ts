import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { EquipmentsModel } from "./Equipments";

export class EquipmentBrandsModel extends Model<InferAttributes<EquipmentBrandsModel>, InferCreationAttributes<EquipmentBrandsModel>> {
  declare id: CreationOptional<number>

  static associate({ models }: iModels.Database) {
    this.hasMany(models.EquipmentModels, { foreignKey: "brandId", as: "equips", onDelete: "NO ACTION" })
  }

  declare equips: NonAttribute<EquipmentsModel[]>

  declare static associations: {
    equips: Association<EquipmentBrandsModel, EquipmentsModel>
  };
}

export function getEquipmentBrandsModel(sequelize: Sequelize) {
  EquipmentBrandsModel.init(
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
      tableName: "equipment-brands",
      modelName: "EquipmentBrandsModel"
    }
  )
  return EquipmentBrandsModel
}