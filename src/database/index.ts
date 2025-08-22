import { Sequelize } from "sequelize"
import { sequelize } from "./databaseClient"
import { AgentsModel, getAgentsModel } from "./models/Agents"
import { CabinetsModel, getCabinetsModel } from "./models/Cabinets"
import { ContactsModel, getContactsModel } from "./models/Contacts"
import { EmployeeModel, getEmployeeModel } from "./models/Employees"
import { EquipmentBrandsModel, getEquipmentBrandsModel } from "./models/EquipmentBrands"
import { EquipmentModelsModel, getEquipmentModelsModel } from "./models/EquipmentModels"
import { EquipmentsModel, getEquipmentsModel } from "./models/Equipments"
import { ExecutionsModel, getExecutionsModel } from "./models/Executions"
import { NotesModel, getNotesModel } from "./models/Notes"
import { PersonalModel, getPersonalModel } from "./models/Personal"
import { PhotoGalleryModel, getPhotoGalleryModel } from "./models/PhotoGallery"
import { TypeofExecutionsModel, getTypeofExecutionsModel } from "./models/TypeofExecutions"
import { getUserModel, UserModel } from "./models/User"
import { getTypeofEquipmentsModel, TypeofEquipmentsModel } from "./models/TypeofEquipments"

export const Database = {
  sequelize,
  Sequelize,
  models: {
    Equipments: getEquipmentsModel(sequelize),
    TypeofEquipments: getTypeofEquipmentsModel(sequelize),
    EquipmentModels: getEquipmentModelsModel(sequelize),
    EquipmentBrands: getEquipmentBrandsModel(sequelize),
    Agents: getAgentsModel(sequelize),
    Cabinets: getCabinetsModel(sequelize),
    Contacts: getContactsModel(sequelize),
    Employees: getEmployeeModel(sequelize),
    Executions: getExecutionsModel(sequelize),
    Notes: getNotesModel(sequelize),
    Personals: getPersonalModel(sequelize),
    PhotoGallery: getPhotoGalleryModel(sequelize),
    TypeofExecutions: getTypeofExecutionsModel(sequelize),
    Users: getUserModel(sequelize),
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
  EquipmentBrands: EquipmentBrandsModel
  EquipmentModels: EquipmentModelsModel
  TypeofEquipmentsModel: TypeofEquipmentsModel
  Equipments: EquipmentsModel
  Executions: ExecutionsModel
  Notes: NotesModel
  Personal: PersonalModel
  PhotoGallery: PhotoGalleryModel
  TypeofExecutions: TypeofExecutionsModel
  Users: UserModel
}
