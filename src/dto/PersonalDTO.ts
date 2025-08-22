import { iRoute, iUserToken } from "@/libs";
import { PersonalService } from "@/services/PersonalService";
import { CreationAttributes, InferAttributes, InferCreationAttributes } from "sequelize";

export class PersonalDTO {
  readonly routes: iRoute[] = [
    {
      requireAuth: true,
      method: "GET",
      url: "/personal",
      callback: this.getPersonalList.bind(this)
    } as iRoute<{}, iModels.Models<'Personal'>[]>,
    {
      requireAuth: true,
      method: "GET",
      url: "/personal\\?id=[0-9]{1,}",
      callback: this.getPersonalById.bind(this)
    } as iRoute<{ id: number }, iModels.Models<'Personal'>>,
    {
      requireAuth: true,
      method: "POST",
      url: "/personal",
      callback: this.createPersonal.bind(this)
    } as iRoute<CreationAttributes<iModels.Models<'Personal'>>, iModels.Models<'Personal'>>,
    {
      requireAuth: true,
      method: "PUT",
      url: "/personal",
      callback: this.updatePersonal.bind(this)
    } as iRoute<InferAttributes<iModels.Models<'Personal'>>, iModels.Models<'Personal'>>,
    {
      requireAuth: true,
      method: "DELETE",
      url: "/personal?\\?id=[0-9]{1,}",
      callback: this.deletePersonal.bind(this)
    } as iRoute<{ id: number }, true>
  ]
  private service: PersonalService
  constructor(base: iModels.Database) {
    this.service = new PersonalService(base)
  }

  getPersonalList(): Promise<{ result: iModels.Models<'Personal'>[] }> {
    return new Promise((resolve, reject) => {
      this.service.getList()
        .then((list) => resolve(list))
        .catch((error) => reject(error))
    })
  }
  getPersonalById(user: iUserToken, payload: { id: number }): Promise<{ result: iModels.Models<'Personal'> }> {
    return new Promise((resolve, reject) => {
      this.service.getById(payload.id)
        .then()
        .catch((error) => reject(error))
    })
  }
  createPersonal(user: iUserToken, payload: CreationAttributes<iModels.Models<'Personal'>>): Promise<{ result: iModels.Models<'Personal'> }> {
    return new Promise((resolve, reject) => {
      this.service.create(payload)
        .then(person => resolve({ result: person.result }))
        .catch((error) => reject(error))
    })
  }
  updatePersonal(user: iUserToken, payload: InferAttributes<iModels.Models<'Personal'>>): Promise<{ result: iModels.Models<'Personal'> }> {
    return new Promise((resolve, reject) => {
      this.service.update(payload)
        .then(person => resolve({ result: person.result }))
        .catch((error) => reject(error))
    })
  }
  deletePersonal(user: iUserToken, payload: { id: number }): Promise<{ result: true }> {
    return new Promise((resolve, reject) => {
      this.service.delete(payload.id)
        .then((res) => resolve({ result: res.result }))
        .catch((error) => reject(error))
    })
  }
}