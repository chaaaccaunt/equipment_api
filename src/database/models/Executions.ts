import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { EquipmentsModel } from "./Equipments";
import { TypeofExecutionsModel } from "./TypeofExecutions";
import { EmployeeModel } from "./Employees";
import { PersonalModel } from "./Personal";
import { AgentsModel } from "./Agents";
import { NotesModel } from "./Notes";

export class ExecutionsModel extends Model<InferAttributes<ExecutionsModel>, InferCreationAttributes<ExecutionsModel>> {
  declare id: CreationOptional<number>

  declare createdDate: CreationOptional<Date>
  declare executedDate: CreationOptional<Date>

  declare equipmentId: ForeignKey<EquipmentsModel["id"]>
  declare typeofExecutionId: ForeignKey<TypeofExecutionsModel["id"]>
  declare personalId: ForeignKey<EmployeeModel["id"]>
  declare employeeId: ForeignKey<EmployeeModel["id"]>
  declare agentId: ForeignKey<EmployeeModel["id"]>

  static associate({ models }: iModels.Database) {
    this.hasOne(models.Equipments, { foreignKey: "equipmentId", as: "equipment", onDelete: "NO ACTION" })
    this.hasOne(models.TypeofExecutions, { foreignKey: "typeofExecutionId", as: "typeofExecution", onDelete: "NO ACTION" })
    this.hasOne(models.Personals, { foreignKey: "personalId", as: "personal", onDelete: "NO ACTION" })
    this.hasOne(models.Employees, { foreignKey: "employeeId", as: "employee", onDelete: "NO ACTION" })
    this.hasOne(models.Agents, { foreignKey: "agentId", as: "agent", onDelete: "NO ACTION" })

    this.hasMany(models.Notes, { foreignKey: "executionId", as: "notes", onDelete: "CASCADE" })
  }

  declare equipment: NonAttribute<EquipmentsModel>
  declare typeofExecution: NonAttribute<TypeofExecutionsModel>
  declare personal: NonAttribute<PersonalModel>
  declare employee: NonAttribute<EmployeeModel>
  declare agent: NonAttribute<AgentsModel>

  declare notes: NonAttribute<NotesModel[]>

  declare static associations: {
    equipment: Association<ExecutionsModel, EquipmentsModel>
    typeofExecution: Association<ExecutionsModel, TypeofExecutionsModel>
    personal: Association<ExecutionsModel, PersonalModel>
    employee: Association<ExecutionsModel, EmployeeModel>
    agent: Association<ExecutionsModel, AgentsModel>
    notes: Association<ExecutionsModel, NotesModel>
  };
}

export function getExecutionsModel(sequelize: Sequelize) {
  ExecutionsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      createdDate: DataTypes.DATE,
      executedDate: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: false,
      paranoid: true,
      tableName: "executions",
      modelName: "ExecutionsModel"
    }
  )
  return ExecutionsModel
}