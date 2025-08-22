import { iRoute } from "@/libs";
import { BrandsService } from "@/services/BrandsService";
import { InferAttributes, InferCreationAttributes } from "sequelize";

export class BrandsDTO {
  readonly routes: iRoute[] = [
    {
      url: "/brands",
      callback: this.getAll.bind(this),
      method: "GET",
      requireAuth: true,
    } as iRoute<{}, iModels.Models<"EquipmentBrands">[]>,
    {
      url: "/brands\\?id=[0-9]{1,}",
      callback: this.getById.bind(this),
      method: "GET",
      requireAuth: true,
    } as iRoute<{ id: number }, iModels.Models<"EquipmentBrands">>,
    {
      url: "/brands",
      callback: this.create.bind(this),
      method: "POST",
      requireAuth: true,
    } as iRoute<InferCreationAttributes<iModels.Models<"EquipmentBrands">>, iModels.Models<"EquipmentBrands">>,
    {
      url: "/brands",
      callback: this.update.bind(this),
      method: "PUT",
      requireAuth: true,
    } as iRoute<InferAttributes<iModels.Models<"EquipmentBrands">>, iModels.Models<"EquipmentBrands">>,
    {
      url: "/brands",
      callback: this.delete.bind(this),
      method: "DELETE",
      requireAuth: true,
    } as iRoute<{ id: number }, boolean>,
  ]
  private service: BrandsService
  constructor(base: iModels.Database) {
    this.service = new BrandsService(base)
  }
  private getAll(): Promise<{ result: iModels.Models<"EquipmentBrands">[] }> {
    return new Promise((resolve, reject) => {
      this.service.getList()
        .then((cabinets) => resolve({ result: cabinets.result }))
        .catch(error => reject(error))
    })
  }
  private getById({ }, payload: { id: number }): Promise<{ result: iModels.Models<"EquipmentBrands"> | null }> {
    return new Promise((resolve, reject) => {
      this.service.getById(payload.id)
        .then((cabinet) => resolve({ result: cabinet.result }))
        .catch(error => reject(error))
    })
  }
  private create({ }, payload: InferCreationAttributes<iModels.Models<"EquipmentBrands">>): Promise<{ result: iModels.Models<"EquipmentBrands"> }> {
    return new Promise((resolve, reject) => {
      this.service.create(payload)
        .then((cabinet) => resolve({ result: cabinet.result }))
        .catch(error => reject(error))
    })
  }
  private update({ }, payload: InferAttributes<iModels.Models<"EquipmentBrands">>): Promise<{ result: iModels.Models<"EquipmentBrands"> }> {
    return new Promise((resolve, reject) => {
      this.service.update(payload)
        .then((cabinet) => resolve({ result: cabinet.result }))
        .catch(error => reject(error))
    })
  }
  private delete({ }, payload: { id: number }): Promise<{ result: boolean }> {
    return new Promise((resolve, reject) => {
      this.service.delete(payload.id)
        .then((cabinet) => resolve({ result: cabinet.result }))
        .catch(error => reject(error))
    })
  }
}