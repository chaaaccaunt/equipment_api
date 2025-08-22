import { iRoute } from "@/libs";
import { CabinetService } from "@/services/CabinetService";

export class CabinetDTO {
  readonly routes: iRoute[] = [
    {
      url: "/cabinets",
      callback: this.getAll.bind(this),
      method: "GET",
      requireAuth: true,
    } as iRoute<{}, iModels.Models<"Cabinets">[]>,
    {
      url: "/cabinets\\?id=[0-9]{1,}",
      callback: this.getById.bind(this),
      method: "GET",
      requireAuth: true,
    } as iRoute<{ id: number }, iModels.Models<"Cabinets">>,
    {
      url: "/cabinets",
      callback: this.create.bind(this),
      method: "POST",
      requireAuth: true,
    } as iRoute<{ number: number }, iModels.Models<"Cabinets">>,
    {
      url: "/cabinets",
      callback: this.update.bind(this),
      method: "PUT",
      requireAuth: true,
    } as iRoute<{ number: number, id: number }, iModels.Models<"Cabinets">>,
    {
      url: "/cabinets",
      callback: this.delete.bind(this),
      method: "DELETE",
      requireAuth: true,
    } as iRoute<{ id: number }, boolean>,
  ]
  private service: CabinetService
  constructor(base: iModels.Database) {
    this.service = new CabinetService(base)
  }
  private getAll(): Promise<{ result: iModels.Models<"Cabinets">[] }> {
    return new Promise((resolve, reject) => {
      this.service.getAll()
        .then((cabinets) => resolve({ result: cabinets }))
        .catch(error => reject(error))
    })
  }
  private getById({ }, payload: { id: number }): Promise<{ result: iModels.Models<"Cabinets"> | null }> {
    return new Promise((resolve, reject) => {
      this.service.getById(payload.id)
        .then((cabinet) => resolve({ result: cabinet }))
        .catch(error => reject(error))
    })
  }
  private create({ }, payload: { number: number }): Promise<{ result: iModels.Models<"Cabinets"> }> {
    return new Promise((resolve, reject) => {
      this.service.create(payload.number)
        .then((cabinet) => resolve({ result: cabinet }))
        .catch(error => reject(error))
    })
  }
  private update({ }, payload: { id: number, number: number }): Promise<{ result: iModels.Models<"Cabinets"> }> {
    return new Promise((resolve, reject) => {
      this.service.update(payload.id, payload.number)
        .then((cabinet) => resolve({ result: cabinet }))
        .catch(error => reject(error))
    })
  }
  private delete({ }, payload: { id: number }): Promise<{ result: boolean }> {
    return new Promise((resolve, reject) => {
      this.service.delete(payload.id)
        .then((cabinet) => resolve({ result: cabinet }))
        .catch(error => reject(error))
    })
  }
}