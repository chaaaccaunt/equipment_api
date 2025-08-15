export interface iDefaultEnvs { }
import { assignEnv, HTTPServer } from "@/libs";

assignEnv()

import { Database } from "@/database";
import { EquipmentDTO } from "@/dto/EquipmentDTO";
import { CabinetDTO } from "@/dto/CabinetDTO";

const equipments = new EquipmentDTO(Database)
const cabinets = new CabinetDTO(Database)

const httpServer = new HTTPServer()
httpServer.use(equipments.routes)
httpServer.use(cabinets.routes)

Database.sequelize.sync({ force: true })
  .then(() => {
    httpServer.listen("80");
  })
  .catch((error) => {
    if (process.env.VAR_DEBUG) console.log(error)
  })