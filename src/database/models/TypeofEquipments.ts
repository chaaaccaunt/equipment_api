import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { EquipmentsModel } from "./Equipments";

export class TypeofEquipmentsModel extends Model<InferAttributes<TypeofEquipmentsModel>, InferCreationAttributes<TypeofEquipmentsModel>> {
  declare id: CreationOptional<number>
  declare name: string

  static associate({ models }: iModels.Database) {
    this.hasMany(models.EquipmentModels, { foreignKey: "modelId", as: "models", onDelete: "SET NULL" })
  }

  declare models: NonAttribute<EquipmentsModel[]>

  declare static associations: {
    models: Association<TypeofEquipmentsModel, EquipmentsModel>
  };
}

export function getTypeofEquipmentsModel(sequelize: Sequelize) {
  TypeofEquipmentsModel.init(
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
      tableName: "typeof-equipments",
      modelName: "TypeofEquipmentsModel"
    }
  )
  return TypeofEquipmentsModel
}