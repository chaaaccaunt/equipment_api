import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { EquipmentsModel } from "./Equipments";
import { EquipmentBrandsModel } from "./EquipmentBrands";

export class EquipmentModelsModel extends Model<InferAttributes<EquipmentModelsModel>, InferCreationAttributes<EquipmentModelsModel>> {
  declare id: CreationOptional<number>

  declare brandId: ForeignKey<EquipmentBrandsModel["id"]>

  static associate({ models }: iModels.Database) {
    this.hasOne(models.EquipmentBrands, { foreignKey: "brandId", as: "brand", onDelete: "NO ACTION" })

    this.hasMany(models.Equipments, { foreignKey: "modelId", as: "equips", onDelete: "NO ACTION" })
  }

  declare equips: NonAttribute<EquipmentsModel[]>
  declare brand: NonAttribute<EquipmentBrandsModel>

  declare static associations: {
    equips: Association<EquipmentModelsModel, EquipmentsModel>
    brand: Association<EquipmentsModel, EquipmentBrandsModel>
  };
}

export function getEquipmentModelsModel(sequelize: Sequelize) {
  EquipmentModelsModel.init(
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
      tableName: "equipment-models",
      modelName: "EquipmentModelsModel"
    }
  )
  return EquipmentModelsModel
}