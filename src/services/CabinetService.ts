export class CabinetService {
  constructor(private base: iModels.Database) { }
  getAllCabinets(): Promise<iModels.Models<'Cabinets'>[]> {
    return new Promise((resolve, reject) => {
      this.base.models.Cabinets.findAll()
        .then((cabinets) => resolve(cabinets))
        .catch(error => reject(error))
    })
  }
  getCabinetById(id: number): Promise<iModels.Models<'Cabinets'> | null> {
    return new Promise((resolve, reject) => {
      this.base.models.Cabinets.findOne({ where: { id } })
        .then((cabinet) => resolve(cabinet))
        .catch(error => reject(error))
    })
  }
  createCabinet(number: number): Promise<iModels.Models<'Cabinets'>> {
    return new Promise((resolve, reject) => {
      this.base.models.Cabinets.create({ number })
        .then((cabinet) => resolve(cabinet))
        .catch(error => reject(error))
    })
  }
  deleteCabinet(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.base.models.Cabinets.destroy({ where: { id } })
        .then(() => resolve(true))
        .catch(error => reject(error))
    })
  }
  updateCabinet(id: number, number: number): Promise<iModels.Models<'Cabinets'>> {
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