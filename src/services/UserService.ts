import { ServerResponse } from "http";
import { IncomingMessage } from "http";
import { compare, hash, genSalt } from "bcryptjs"
import { sign } from "jsonwebtoken";
import { iRoute } from "@/libs";

export class UserAuth {
  readonly routes: iRoute[] = [
    {
      method: "POST",
      url: "/authorization/login",
      authorization: this.userLogin.bind(this),
      requireAuth: false,
      validator: {
        login: {
          type: "string",
          minLength: 2,
          maxLength: 64,
        },
        password: {
          type: "string",
          minLength: 2,
          maxLength: 64,
        }
      }
    },
    {
      method: "POST",
      url: "/authorization/logout",
      authorization: this.userLogout.bind(this),
      requireAuth: false,
      validator: {
        login: {
          type: "string",
          minLength: 2,
          maxLength: 64,
        },
        password: {
          type: "string",
          minLength: 2,
          maxLength: 64,
        }
      }
    },
    {
      method: "GET",
      url: "/authorization/state",
      callback: this.checkAuth.bind(this),
      requireAuth: true,
    }
  ]
  constructor(private base: iModels.Database) { }
  userLogin(request: IncomingMessage, response: ServerResponse, payload: { login: string, password: string }) {
    this.base.models.Users.findOne({ where: { login: payload.login } })
      .then((exist) => {
        if (!exist) return response.json({ error: true, status: 200, result: "Не верный пароль или логин" });
        compare(payload.password, exist.password)
          .then((valid) => {
            if (!valid) return response.json({ error: true, status: 200, result: "Не верный пароль или логин" });
            const token = sign(JSON.stringify(exist), process.env.VAR_JWT_TOKEN)
            response.writeHead(200, {
              "set-cookie": `user-sid=${token}; Path=/; HttpOnly; Domain=.equipment.local`,
              "access-control-allow-credentials": "true",
              "access-control-allow-origin": "http://ui.equipment.local:8080",
              "content-type": "application/json; charset=utf-8"
            })
            return response.end(JSON.stringify({ error: false, response: true }))
          })
          .catch((error) => response.json({ error: true, status: 400, result: "Ошибка при выполнений запроса" }))
      })
      .catch((error) => response.json({ error: true, status: 400, result: "Ошибка при выполнений запроса" }))
  }
  userLogout(request: IncomingMessage, response: ServerResponse, payload: undefined) {
    response.writeHead(200, {
      "set-cookie": `user-sid=; Path=/; HttpOnly; Domain=.${process.env.VAR_ORIGIN}; expires=-1`,
      "access-control-allow-credentials": "true",
      "access-control-allow-origin": process.env.VAR_DEBUG ? "*" : process.env.VAR_ORIGIN,
      "content-type": "application/json; charset=utf-8"
    })
    return response.end(JSON.stringify({ error: false, response: true }))
  }
  checkAuth(): Promise<{ result: true }> {
    return new Promise((resolve) => {
      return resolve({ result: true })
    })
  }
}