import { iRoute } from "@/libs";
import { ModelsService } from "@/services/ModelsService";
import { InferAttributes, InferCreationAttributes } from "sequelize";

export class ModelsDTO {
  readonly routes: iRoute[] = [
    {
      url: "/models",
      callback: this.getAll.bind(this),
      method: "GET",
      requireAuth: true,
    } as iRoute<{}, iModels.Models<"EquipmentModels">[]>,
    {
      url: "/models\\?id=[0-9]{1,}",
      callback: this.getById.bind(this),
      method: "GET",
      requireAuth: true,
    } as iRoute<{ id: number }, iModels.Models<"EquipmentModels">>,
    {
      url: "/models",
      callback: this.create.bind(this),
      method: "POST",
      requireAuth: true,
    } as iRoute<InferCreationAttributes<iModels.Models<"EquipmentModels">>, iModels.Models<"EquipmentModels">>,
    {
      url: "/models",
      callback: this.update.bind(this),
      method: "PUT",
      requireAuth: true,
    } as iRoute<InferAttributes<iModels.Models<"EquipmentModels">>, iModels.Models<"EquipmentModels">>,
    {
      url: "/models",
      callback: this.delete.bind(this),
      method: "DELETE",
      requireAuth: true,
    } as iRoute<{ id: number }, boolean>,
  ]
  private service: ModelsService
  constructor(base: iModels.Database) {
    this.service = new ModelsService(base)
  }
  private getAll(): Promise<{ result: iModels.Models<"EquipmentModels">[] }> {
    return new Promise((resolve, reject) => {
      this.service.getList()
        .then((models) => resolve({ result: models.result }))
        .catch(error => reject(error))
    })
  }
  private getById({ }, payload: { id: number }): Promise<{ result: iModels.Models<"EquipmentModels"> | null }> {
    return new Promise((resolve, reject) => {
      this.service.getById(payload.id)
        .then((models) => resolve({ result: models.result }))
        .catch(error => reject(error))
    })
  }
  private create({ }, payload: InferCreationAttributes<iModels.Models<"EquipmentModels">>): Promise<{ result: iModels.Models<"EquipmentModels"> }> {
    return new Promise((resolve, reject) => {
      this.service.create(payload)
        .then((models) => resolve({ result: models.result }))
        .catch(error => reject(error))
    })
  }
  private update({ }, payload: InferAttributes<iModels.Models<"EquipmentModels">>): Promise<{ result: iModels.Models<"EquipmentModels"> }> {
    return new Promise((resolve, reject) => {
      this.service.update(payload)
        .then((models) => resolve({ result: models.result }))
        .catch(error => reject(error))
    })
  }
  private delete({ }, payload: { id: number }): Promise<{ result: boolean }> {
    return new Promise((resolve, reject) => {
      this.service.delete(payload.id)
        .then((models) => resolve({ result: models.result }))
        .catch(error => reject(error))
    })
  }
}