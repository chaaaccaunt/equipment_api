import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { EquipmentsModel } from "./Equipments";
import { EquipmentBrandsModel } from "./EquipmentBrands";
import { TypeofEquipmentsModel } from "./TypeofEquipments";

export class EquipmentModelsModel extends Model<InferAttributes<EquipmentModelsModel>, InferCreationAttributes<EquipmentModelsModel>> {
  declare id: CreationOptional<number>
  declare name: string

  declare typeId: ForeignKey<TypeofEquipmentsModel["id"]>
  declare brandId: ForeignKey<EquipmentBrandsModel["id"]>

  static associate({ models }: iModels.Database) {
    this.belongsTo(models.EquipmentBrands, { foreignKey: "brandId", as: "brand", onDelete: "NO ACTION" })
    this.belongsTo(models.TypeofEquipments, { foreignKey: "typeId", as: "type", onDelete: "NO ACTION" })

    this.hasMany(models.Equipments, { foreignKey: "modelId", as: "models", onDelete: "SET NULL" })
  }

  declare models: NonAttribute<EquipmentsModel[]>
  declare brand: NonAttribute<EquipmentBrandsModel>
  declare type: NonAttribute<TypeofEquipmentsModel>

  declare static associations: {
    models: Association<EquipmentModelsModel, EquipmentsModel>
    brand: Association<EquipmentModelsModel, EquipmentBrandsModel>
    type: Association<EquipmentModelsModel, TypeofEquipmentsModel>
  };
}

export function getEquipmentModelsModel(sequelize: Sequelize) {
  EquipmentModelsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
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