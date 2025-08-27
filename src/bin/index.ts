export interface iDefaultEnvs { }
import { assignEnv, HTTPServer } from "@/libs";

assignEnv()

import { Database } from "@/database";
import { EquipmentDTO } from "@/dto/EquipmentDTO";
import { CabinetDTO } from "@/dto/CabinetDTO";
import { UserAuth } from "@/services/UserService";
import { PersonalDTO } from "@/dto/PersonalDTO";
import { ModelsDTO } from "@/dto/ModelsDTO";
import { BrandsDTO } from "@/dto/BrandsDTO";
import { TypesDTO } from "@/dto/TypesDTO";

const equipments = new EquipmentDTO(Database)
const cabinets = new CabinetDTO(Database)
const personal = new PersonalDTO(Database)
const authorization = new UserAuth(Database)
const brands = new BrandsDTO(Database)
const models = new ModelsDTO(Database)
const types = new TypesDTO(Database)

const httpServer = new HTTPServer()
httpServer.use(equipments.routes)
httpServer.use(cabinets.routes)
httpServer.use(personal.routes)
httpServer.use(authorization.routes)
httpServer.use(brands.routes)
httpServer.use(models.routes)
httpServer.use(types.routes)

Database.sequelize.sync({ force: true })
  .then(async () => {
    const existAdmin = await Database.models.Users.findOne({ where: { login: "admin" } })
    if (!existAdmin) await Database.models.Users.create({ login: "admin", password: "$2b$10$/6DrVioQWxoEE9LKg/12Ve9LAYjAy6C6PO6O9bSE9yzMf.JnYENm2" })
    httpServer.listen("80");
  })
  .catch((error) => {
    if (process.env.VAR_DEBUG) console.log(error)
  })