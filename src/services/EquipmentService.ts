export class EquipmentService {
  constructor(private base: iModels.Database) { }
  getAllEquipmentsList(): Promise<iModels.Models<"Equipments">[]> {
    return new Promise((resolve, reject) => {
      this.base.models.Equipments.findAll({ include: Object.entries(this.base.models.Equipments.associations).map(([key, value]) => ({ association: value })) })
        .then((equipments) => resolve(equipments))
        .catch(error => reject(error))
    })
  }
}