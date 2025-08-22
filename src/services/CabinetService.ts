export class CabinetService {
  constructor(private base: iModels.Database) { }
  getAll(): Promise<iModels.Models<'Cabinets'>[]> {
    return new Promise((resolve, reject) => {
      this.base.models.Cabinets.findAll()
        .then((cabinets) => resolve(cabinets))
        .catch(error => reject(error))
    })
  }
  getById(id: number): Promise<iModels.Models<'Cabinets'> | null> {
    return new Promise((resolve, reject) => {
      this.base.models.Cabinets.findOne({ where: { id } })
        .then((cabinet) => resolve(cabinet))
        .catch(error => reject(error))
    })
  }
  create(number: number): Promise<iModels.Models<'Cabinets'>> {
    return new Promise((resolve, reject) => {
      this.base.models.Cabinets.create({ number })
        .then((cabinet) => resolve(cabinet))
        .catch(error => reject(error))
    })
  }
  delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.base.models.Cabinets.destroy({ where: { id } })
        .then(() => resolve(true))
        .catch(error => reject(error))
    })
  }
  update(id: number, number: number): Promise<iModels.Models<'Cabinets'>> {
    return new Promise((resolve, reject) => {
      this.base.models.Cabinets.findByPk(id)
        .then(async (cabinet) => {
          if (!cabinet) return reject(`Кабинет с идентификатором "${id}" не найден`);
          await cabinet.update({ number })
          resolve(cabinet)
        })
        .catch(error => reject(error))
    })
  }
}