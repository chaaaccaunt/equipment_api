import { Sequelize } from "sequelize";
import mysql2 from "mysql2"

export const sequelize = new Sequelize("equipment", "equipment_user", "equipment1234", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: mysql2,
  // logging: false
})