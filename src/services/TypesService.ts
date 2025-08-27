import { InferCreationAttributes } from "sequelize"

export class TypeofEquipmentsService {
  constructor(private base: iModels.Database) { }
  getAll(): Promise<iModels.Models<'TypeofEquipments'>[]> {
    return new Promise((resolve, reject) => {
      this.base.models.TypeofEquipments.findAll()
        .then((cabinets) => resolve(cabinets))
        .catch(error => reject(error))
    })
  }
  getById(id: number): Promise<iModels.Models<'TypeofEquipments'> | null> {
    return new Promise((resolve, reject) => {
      this.base.models.TypeofEquipments.findOne({ where: { id } })
        .then((cabinet) => resolve(cabinet))
        .catch(error => reject(error))
    })
  }
  create(payload: InferCreationAttributes<iModels.Models<'TypeofEquipments'>>): Promise<iModels.Models<'TypeofEquipments'>> {
    return new Promise((resolve, reject) => {
      this.base.models.TypeofEquipments.create(payload)
        .then((cabinet) => resolve(cabinet))
        .catch(error => reject(error))
    })
  }
  delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.base.models.TypeofEquipments.destroy({ where: { id } })
        .then(() => resolve(true))
        .catch(error => reject(error))
    })
  }
  update(payload: InferCreationAttributes<iModels.Models<'TypeofEquipments'>>): Promise<iModels.Models<'TypeofEquipments'>> {
    return new Promise((resolve, reject) => {
      this.base.models.TypeofEquipments.findByPk(payload.id)
        .then(async (cabinet) => {
          if (!cabinet) return reject(`Тип оборудования не найден`);
          await cabinet.update({
            name: payload.name
          })
          resolve(cabinet)
        })
        .catch(error => reject(error))
    })
  }
}