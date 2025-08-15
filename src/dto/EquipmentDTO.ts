import { iRoute } from "@/libs";
import { EquipmentService } from "@/services/EquipmentService";

export class EquipmentDTO {
  readonly routes: iRoute[] = [
    {
      url: "/equipments",
      callback: this.getEquipments.bind(this),
      method: "GET",
      requireAuth: false,
    } as iRoute<{}, iModels.Models<"Equipments">[]>
  ]
  private service: EquipmentService
  constructor(base: iModels.Database) {
    this.service = new EquipmentService(base)
  }
  private getEquipments(): Promise<{ result: iModels.Models<"Equipments">[] }> {
    return new Promise((resolve, reject) => {
      this.service.getAllEquipmentsList()
        .then((list) => resolve({ result: list }))
        .catch(error => reject(error))
    })
  }
}