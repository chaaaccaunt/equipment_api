import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { EquipmentsModel } from "./Equipments";

export class EquipmentBrandsModel extends Model<InferAttributes<EquipmentBrandsModel>, InferCreationAttributes<EquipmentBrandsModel>> {
  declare id: CreationOptional<number>
  declare name: string

  static associate({ models }: iModels.Database) {
    this.hasMany(models.EquipmentModels, { foreignKey: "brandId", as: "models", onDelete: "SET NULL" })
  }

  declare models: NonAttribute<EquipmentsModel[]>

  declare static associations: {
    models: Association<EquipmentBrandsModel, EquipmentsModel>
  };
}

export function getEquipmentBrandsModel(sequelize: Sequelize) {
  EquipmentBrandsModel.init(
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
      tableName: "equipment-brands",
      modelName: "EquipmentBrandsModel"
    }
  )
  return EquipmentBrandsModel
}