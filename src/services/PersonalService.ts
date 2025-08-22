import { CreationAttributes, InferAttributes } from "sequelize";

export class PersonalService {
  constructor(private base: iModels.Database) { }
  getList(): Promise<{ result: iModels.Models<"Personal">[] }> {
    return new Promise((resolve, reject) => {
      this.base.models.Personals.findAll()
        .then((list) => resolve({ result: list }))
        .catch(error => reject(error))
    })
  }
  getById(id: number): Promise<{ result: iModels.Models<"Personal"> }> {
    return new Promise((resolve, reject) => {
      this.base.models.Personals.findOne({ where: { id } })
        .then((exist) => {
          if (!exist) return reject(`Сотрудник не найден`);
          return resolve({ result: exist })
        })
        .catch(error => reject(error))
    })
  }
  create(payload: CreationAttributes<iModels.Models<"Personal">>): Promise<{ result: iModels.Models<"Personal"> }> {
    return new Promise((resolve, reject) => {
      this.base.models.Personals.create(payload)
        .then((cabinet) => resolve({ result: cabinet }))
        .catch(error => reject(error))
    })
  }
  delete(id: number): Promise<{ result: true }> {
    return new Promise((resolve, reject) => {
      this.base.models.Personals.findOne({ where: { id } })
        .then(async (exist) => {
          if (!exist) return reject(`Сотрудник не найден`);
          await exist.destroy()
          return resolve({ result: true })
        })
        .catch(error => reject(error))
    })
  }
  update(payload: InferAttributes<iModels.Models<"Personal">>): Promise<{ result: iModels.Models<"Personal"> }> {
    return new Promise((resolve, reject) => {
      this.base.models.Personals.findOne({ where: { id: payload.id } })
        .then(async (exist) => {
          if (!exist) return reject(`Сотрудник не найден`);
          const updated = await exist.update({
            firstName: payload.firstName,
            lastName: payload.lastName,
            position: payload.position,
            surName: payload.surName
          }, { returning: true })
          return resolve({ result: updated })
        })
        .catch(error => reject(error))
    })
  }
} 