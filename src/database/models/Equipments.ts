import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { EquipmentModelsModel } from "./EquipmentModels";
import { CabinetsModel } from "./Cabinets";
import { ExecutionsModel } from "./Executions";
import { PersonalModel } from "./Personal";

export class EquipmentsModel extends Model<InferAttributes<EquipmentsModel>, InferCreationAttributes<EquipmentsModel>> {
  declare id: CreationOptional<number>
  declare serialNumber: string | null
  declare inventoryNumber: string | null

  declare modelId: ForeignKey<EquipmentModelsModel["id"]>
  declare cabinetId: ForeignKey<CabinetsModel["id"]>
  declare personalId: ForeignKey<PersonalModel["id"]>

  static associate({ models }: iModels.Database) {
    this.belongsTo(models.EquipmentModels, { foreignKey: "modelId", as: "model", onDelete: "NO ACTION" })
    this.belongsTo(models.Cabinets, { foreignKey: "cabinetId", as: "cabinet", onDelete: "NO ACTION" })
    this.belongsTo(models.Personals, { foreignKey: "personalId", as: "person", onDelete: "NO ACTION" })

    this.hasMany(models.Executions, { foreignKey: "equipmentId", as: "executions", onDelete: "SET NULL" })
  }

  declare model: NonAttribute<EquipmentModelsModel>
  declare cabinet: NonAttribute<CabinetsModel>
  declare person: NonAttribute<PersonalModel>

  declare executions: NonAttribute<ExecutionsModel[]>

  declare static associations: {
    model: Association<EquipmentsModel, EquipmentModelsModel>
    cabinet: Association<EquipmentsModel, CabinetsModel>
    person: Association<EquipmentsModel, PersonalModel>
    executions: Association<EquipmentsModel, ExecutionsModel>
  };
}

export function getEquipmentsModel(sequelize: Sequelize) {
  EquipmentsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      serialNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      inventoryNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: "equipments",
      modelName: "EquipmentsModel"
    }
  )
  return EquipmentsModel
}