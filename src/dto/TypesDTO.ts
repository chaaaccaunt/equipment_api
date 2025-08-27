import { iRoute, iUserToken } from "@/libs";
import { TypeofEquipmentsService } from "@/services/TypesService";
import { InferAttributes, InferCreationAttributes } from "sequelize";

export class TypesDTO {
  readonly routes: iRoute[] = [
    {
      url: "/types",
      callback: this.getAll.bind(this),
      method: "GET",
      requireAuth: true,
    } as iRoute<{}, iModels.Models<"TypeofEquipments">[]>,
    {
      url: "/types\\?id=[0-9]{1,}",
      callback: this.getById.bind(this),
      method: "GET",
      requireAuth: true,
    } as iRoute<{ id: number }, iModels.Models<"TypeofEquipments">>,
    {
      url: "/types",
      callback: this.create.bind(this),
      method: "POST",
      requireAuth: true,
    } as iRoute<InferCreationAttributes<iModels.Models<"TypeofEquipments">>, iModels.Models<"TypeofEquipments">>,
    {
      url: "/types",
      callback: this.update.bind(this),
      method: "PUT",
      requireAuth: true,
    } as iRoute<InferAttributes<iModels.Models<"TypeofEquipments">>, iModels.Models<"TypeofEquipments">>,
    {
      url: "/types",
      callback: this.delete.bind(this),
      method: "DELETE",
      requireAuth: true,
    } as iRoute<{ id: number }, boolean>,
  ]
  private service: TypeofEquipmentsService
  constructor(base: iModels.Database) {
    this.service = new TypeofEquipmentsService(base)
  }
  private getAll(): Promise<{ result: iModels.Models<"TypeofEquipments">[] }> {
    return new Promise((resolve, reject) => {
      this.service.getAll()
        .then((cabinets) => resolve({ result: cabinets }))
        .catch(error => reject(error))
    })
  }
  private getById(user: iUserToken, payload: { id: number }): Promise<{ result: iModels.Models<"TypeofEquipments"> | null }> {
    return new Promise((resolve, reject) => {
      this.service.getById(payload.id)
        .then((cabinet) => resolve({ result: cabinet }))
        .catch(error => reject(error))
    })
  }
  private create(user: iUserToken, payload: InferCreationAttributes<iModels.Models<"TypeofEquipments">>): Promise<{ result: iModels.Models<"TypeofEquipments"> }> {
    return new Promise((resolve, reject) => {
      this.service.create(payload)
        .then((cabinet) => resolve({ result: cabinet }))
        .catch(error => reject(error))
    })
  }
  private update(user: iUserToken, payload: InferAttributes<iModels.Models<"TypeofEquipments">>): Promise<{ result: iModels.Models<"TypeofEquipments"> }> {
    return new Promise((resolve, reject) => {
      this.service.update(payload)
        .then((cabinet) => resolve({ result: cabinet }))
        .catch(error => reject(error))
    })
  }
  private delete(user: iUserToken, payload: { id: number }): Promise<{ result: boolean }> {
    return new Promise((resolve, reject) => {
      this.service.delete(payload.id)
        .then((cabinet) => resolve({ result: cabinet }))
        .catch(error => reject(error))
    })
  }
}