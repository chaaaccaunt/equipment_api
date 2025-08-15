import { Sequelize } from "sequelize"
import { sequelize } from "./databaseClient"
import { AgentsModel, getAgentsModel } from "./models/Agents"
import { CabinetsModel, getCabinetsModel } from "./models/Cabinets"
import { ContactsModel, getContactsModel } from "./models/Contacts"
import { EmployeeModel, getEmployeeModel } from "./models/Employees"
import { EmployeePositionsModel, getEmployeePositionsModel } from "./models/EmployeePositions"
import { EquipmentBrandsModel, getEquipmentBrandsModel } from "./models/EquipmentBrands"
import { EquipmentModelsModel, getEquipmentModelsModel } from "./models/EquipmentModels"
import { EquipmentsModel, getEquipmentsModel } from "./models/Equipments"
import { ExecutionsModel, getExecutionsModel } from "./models/Executions"
import { NotesModel, getNotesModel } from "./models/Notes"
import { PersonalModel, getPersonalModel } from "./models/Personal"
import { PhotoGalleryModel, getPhotoGalleryModel } from "./models/PhotoGallery"
import { TypeofExecutionsModel, getTypeofExecutionsModel } from "./models/TypeofExecutions"

export const Database = {
  sequelize,
  Sequelize,
  models: {
    Agents: getAgentsModel(sequelize),
    Cabinets: getCabinetsModel(sequelize),
    Contacts: getContactsModel(sequelize),
    EmployeePositions: getEmployeePositionsModel(sequelize),
    Employees: getEmployeeModel(sequelize),
    EquipmentBrands: getEquipmentBrandsModel(sequelize),
    EquipmentModels: getEquipmentModelsModel(sequelize),
    Equipments: getEquipmentsModel(sequelize),
    Executions: getExecutionsModel(sequelize),
    Notes: getNotesModel(sequelize),
    Personals: getPersonalModel(sequelize),
    PhotoGallery: getPhotoGalleryModel(sequelize),
    TypeofExecutions: getTypeofExecutionsModel(sequelize)
  }
}

Object.keys(Database.models).forEach((key) => {
  Database.models[key as keyof typeof Database.models].associate(Database)
})

export interface iDatabase {
  Agents: AgentsModel
  Cabinets: CabinetsModel
  Contacts: ContactsModel
  Employee: EmployeeModel
  EmployeePositions: EmployeePositionsModel
  EquipmentBrands: EquipmentBrandsModel
  EquipmentModels: EquipmentModelsModel
  Equipments: EquipmentsModel
  Executions: ExecutionsModel
  Notes: NotesModel
  Personal: PersonalModel
  PhotoGallery: PhotoGalleryModel
  TypeofExecutions: TypeofExecutionsModel
}
