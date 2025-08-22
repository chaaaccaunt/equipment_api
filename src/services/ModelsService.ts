import { CreationAttributes, InferAttributes } from "sequelize";

export class ModelsService {
  constructor(private base: iModels.Database) { }
  getList(): Promise<{ result: iModels.Models<"EquipmentModels">[] }> {
    return new Promise((resolve, reject) => {
      this.base.models.EquipmentModels.findAll()
        .then((list) => resolve({ result: list }))
        .catch(error => reject(error))
    })
  }
  getById(id: number): Promise<{ result: iModels.Models<"EquipmentModels"> }> {
    return new Promise((resolve, reject) => {
      this.base.models.EquipmentModels.findOne({ where: { id } })
        .then((exist) => {
          if (!exist) return reject(`Оборудование не найден`);
          return resolve({ result: exist })
        })
        .catch(error => reject(error))
    })
  }
  create(payload: CreationAttributes<iModels.Models<"EquipmentModels">>): Promise<{ result: iModels.Models<"EquipmentModels"> }> {
    return new Promise((resolve, reject) => {
      this.base.models.EquipmentModels.create(payload)
        .then((cabinet) => resolve({ result: cabinet }))
        .catch(error => reject(error))
    })
  }
  delete(id: number): Promise<{ result: true }> {
    return new Promise((resolve, reject) => {
      this.base.models.EquipmentModels.findOne({ where: { id } })
        .then(async (exist) => {
          if (!exist) return reject(`Оборудование не найден`);
          await exist.destroy()
          return resolve({ result: true })
        })
        .catch(error => reject(error))
    })
  }
  update(payload: InferAttributes<iModels.Models<"EquipmentModels">>): Promise<{ result: iModels.Models<"EquipmentModels"> }> {
    return new Promise((resolve, reject) => {
      this.base.models.EquipmentModels.findOne({ where: { id: payload.id } })
        .then(async (exist) => {
          if (!exist) return reject(`Оборудование не найден`);
          const updated = await exist.update({
            id: payload.id,
            name: payload.name,
            brandId: payload.brandId,
          }, { returning: true })
          return resolve({ result: updated })
        })
        .catch(error => reject(error))
    })
  }
}