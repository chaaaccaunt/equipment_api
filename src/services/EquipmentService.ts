import { CreationAttributes, InferAttributes } from "sequelize";

export class EquipmentService {
  constructor(private base: iModels.Database) { }
  getList(): Promise<{ result: iModels.Models<"Equipments">[] }> {
    return new Promise((resolve, reject) => {
      this.base.models.Equipments.findAll({
        include: [
          { association: this.base.models.Equipments.associations.cabinet },
          {
            association: this.base.models.Equipments.associations.model,
            include: [
              { association: this.base.models.EquipmentModels.associations.brand },
              { association: this.base.models.EquipmentModels.associations.models },
              { association: this.base.models.EquipmentModels.associations.type }
            ]
          },
          { association: this.base.models.Equipments.associations.person },
          { association: this.base.models.Equipments.associations.executions },
        ]
      })
        .then((list) => resolve({ result: list }))
        .catch(error => reject(error))
    })
  }
  getById(id: number): Promise<{ result: iModels.Models<"Equipments"> }> {
    return new Promise((resolve, reject) => {
      this.base.models.Equipments.findOne({ where: { id } })
        .then((exist) => {
          if (!exist) return reject(`Оборудование не найден`);
          return resolve({ result: exist })
        })
        .catch(error => reject(error))
    })
  }
  create(payload: CreationAttributes<iModels.Models<"Equipments">>): Promise<{ result: iModels.Models<"Equipments"> }> {
    return new Promise((resolve, reject) => {
      this.base.models.Equipments.create(payload)
        .then((cabinet) => resolve({ result: cabinet }))
        .catch(error => reject(error))
    })
  }
  delete(id: number): Promise<{ result: true }> {
    return new Promise((resolve, reject) => {
      this.base.models.Equipments.findOne({ where: { id } })
        .then(async (exist) => {
          if (!exist) return reject(`Оборудование не найден`);
          await exist.destroy()
          return resolve({ result: true })
        })
        .catch(error => reject(error))
    })
  }
  update(payload: InferAttributes<iModels.Models<"Equipments">>): Promise<{ result: iModels.Models<"Equipments"> }> {
    return new Promise((resolve, reject) => {
      this.base.models.Equipments.findOne({ where: { id: payload.id } })
        .then(async (exist) => {
          if (!exist) return reject(`Оборудование не найден`);
          const updated = await exist.update({
            id: payload.id,
            cabinetId: payload.cabinetId,
            inventoryNumber: payload.inventoryNumber,
            modelId: payload.modelId,
            personalId: payload.personalId,
            serialNumber: payload.serialNumber,
          }, { returning: true })
          return resolve({ result: updated })
        })
        .catch(error => reject(error))
    })
  }
}