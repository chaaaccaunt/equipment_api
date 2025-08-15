import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { verify } from "jsonwebtoken"
import { parse } from "querystring"

export interface iHTTPServer {
  VAR_ORIGIN: string
  VAR_COOKIE_NAME: string
  VAR_TOKEN: string
}

export interface iUserToken { }

export interface IValidate {
  [key: string]: {
    type: "number" | "string" | "array" | "object" | "boolean" | "as_number"
    object?: IValidate
    array?: IValidate
    minValue?: number
    maxValue?: number
    minLength?: number
    maxLength?: number
    optional?: boolean
  }
}


declare module "http" {
  interface IncomingMessage {
    user: iUserToken
  }
  interface ServerResponse {
    json: ({ error, status, result }: { error: boolean, status: number, result: any }) => void;
  }
}

export interface iRoute<Payload = any, Result = any> {
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  requireAuth: boolean
  callback: (user: iUserToken, payload: Payload) => Promise<{ result: Result }>
  validator?: IValidate
}

export class HTTPServer {
  public server: Server
  private routes: Map<string, iRoute & { reg: RegExp }> = new Map()
  private cookieName = new RegExp(`^${process.env.VAR_COOKIE_NAME}=`)
  constructor() {
    if (!process.env.VAR_ORIGIN) throw Error("VAR_ORIGIN is missing")
    this.server = createServer((request, response) => this.requestHandler(request, response))
  }
  private assignJsonFunction(response: ServerResponse): ({ error, status, result }: { error: boolean, status: number, result: any }) => void {
    return function ({ error, status, result }) {
      response.writeHead(status, {
        "access-control-allow-credentials": "true",
        "access-control-allow-origin": process.env.VAR_DEBUG ? "*" : process.env.VAR_ORIGIN,
        "content-type": "application/json; charset=utf-8"
      })
      return response.end(JSON.stringify({ error, response: result }))
    }
  }
  private requestHandler(request: IncomingMessage, response: ServerResponse) {
    let body = Buffer.alloc(0)
    request.on("data", (chunk: Buffer) => {
      body = Buffer.concat([body, chunk])
      if (body.length > 1024 * 5) {
        response.json = this.assignJsonFunction(response)
        return response.json({ error: true, status: 413, result: false })
      }
    })
    request.on("end", () => {
      if (!request.url || !request.method) return response.json({ error: true, status: 400, result: false });
      response.json = this.assignJsonFunction(response)
      let url: string = ""
      const query = /\?/.test(request.url)
      if (query) url = request.url.split("?")[0]
      else url = request.url
      const match = this.routes.get(`${request.method}:${url}`)
      if (!match) return response.json({ error: true, status: 404, result: false });
      if (query) {
        if (!match.reg.test(request.url)) return response.json({ error: true, status: 404, result: false })
      }
      try {
        let payload: Record<any, any> | undefined = undefined
        if (match.method === "GET") {
          const existQuery = this.checkQueryStringParameters(request.url)
          if (existQuery) payload = existQuery
        } else payload = JSON.parse(body.toString())
        if (match.validator) {
          const valid = this.payloadValidator(payload, match.validator)
          if (valid.error) return response.json({ error: true, status: 404, result: valid.message })
        }
        return this.endpointExecutor(request, response, match, payload)
      }
      catch (error: any) {
        return response.json({ error: true, status: 404, result: error?.message ? error.message : error })
      }
    })
  }
  private endpointExecutor(request: IncomingMessage, response: ServerResponse, route: iRoute, payload?: Record<any, any>): Promise<void> {
    return new Promise((resolve) => {
      if (route.requireAuth) {
        const valid = this.tokenValidator(request)
        if (!valid) response.json({ error: true, status: 403, result: false });
        return resolve()
      }
      route.callback(request.user, payload)
        .then(({ result }) => {
          response.json({ error: false, result, status: 200 })
          return resolve()
        })
        .catch((error) => {
          response.json({ error: true, result: false, status: 400 })
          return resolve()
        })
    })
  }
  private tokenValidator(request: IncomingMessage) {
    if (!request.headers.cookie || !request.headers.cookie.length) return false
    const cookies = request.headers.cookie.split(";")
    if (!process.env.VAR_TOKEN) throw new Error("missing VAR_TOKEN")
    for (let i = 0; i < cookies.length; i++) {
      if (this.cookieName.test(cookies[i].trim())) {
        return verify(cookies[i].trim().split("=")[1], process.env.VAR_TOKEN, (err, data) => {
          if (err) return false
          request.user = data as iUserToken
          return true
        })
      }
    }
    return false
  }
  private checkQueryStringParameters(reqString: string): undefined | Record<any, any> {
    const exist = reqString.split("?")
    if (exist.length < 2) return undefined
    return parse(exist[1])
  }
  private normalizePort(val: string) {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }
  private payloadValidator(payload: any, scheme: IValidate): { error: boolean, message: string } {
    const types = Object.entries(scheme)
    const object = Object.entries(payload)
    const result = {
      error: false,
      message: "",
    }
    for (let i = 0; i < object.length; i++) {
      const exist = types.findIndex(t => t[0] === object[i][0])
      if (exist === -1) {
        return { error: true, message: `Ошибка при проверке полученных данных. Поле "${object[i][0]}" не предусмотрено` }
      }
    }
    for (let i = 0; i < types.length; i++) {
      if (types[i][1].optional && !payload[types[i][0]]) continue
      if (types[i][1].type === "array") {
        if (!Array.isArray(payload[types[i][0]])) return { message: `Ошибка при проверке полученных данных. Поле "${types[i][0]}" имеет недопустимое значение.`, error: true }
        if (!types[i][1].array) return { message: `Ошибка при проверке полученных данных. Поле "${types[i][0]}" имеет недопустимое значение.`, error: true }
        for (let a = 0; a < payload[types[i][0]].length; a++) {
          const { error, message } = this.payloadValidator(payload[types[i][0]][a], types[i][1].array!)
          if (error) return { error: true, message }
        }
      } else if (types[i][1].type === "object") {
        const { error, message } = this.payloadValidator(payload[types[i][0]], types[i][1].object!)
        if (error) return { error: true, message }
      } else {
        if (types[i][1].type === "as_number") {
          if (typeof payload[types[i][0]] !== "string" && isNaN(parseInt(payload[types[i][0]]))) return { message: `Ошибка при проверке полученных данных. Поле "${types[i][0]}" имеет недопустимое значение.`, error: true }
          if (types[i][1].minValue && types[i][1].minValue! > parseInt(payload[types[i][0]])) return { message: `Ошибка при проверке полученных данных. Поле "${types[i][0]}" имеет значение меньше ожидаемого.`, error: true }
          if (types[i][1].maxValue && types[i][1].maxValue! < parseInt(payload[types[i][0]])) return { message: `Ошибка при проверке полученных данных. Поле "${types[i][0]}" имеет значение больше ожидаемого.`, error: true }
        }
        if (types[i][1].type === "number") {
          if (typeof payload[types[i][0]] !== "number") return { message: `Ошибка при проверке полученных данных. Поле "${types[i][0]}" имеет недопустимое значение.`, error: true }
          if (types[i][1].minValue && types[i][1].minValue! > payload[types[i][0]]) return { message: `Ошибка при проверке полученных данных. Поле "${types[i][0]}" имеет значение меньше ожидаемого.`, error: true }
          if (types[i][1].maxValue && types[i][1].maxValue! < payload[types[i][0]]) return { message: `Ошибка при проверке полученных данных. Поле "${types[i][0]}" имеет значение больше ожидаемого.`, error: true }
        }
        if (types[i][1].type === "string") {
          if (typeof payload[types[i][0]] !== "string") return { message: `Ошибка при проверке полученных данных. Поле "${types[i][0]}" имеет недопустимое значение..`, error: true }
          if (types[i][1].minLength && types[i][1].minLength! > payload[types[i][0]].length) return { message: `Ошибка при проверке полученных данных. Поле "${types[i][0]}" имеет значение меньше ожидаемого.`, error: true }
          if (types[i][1].maxLength && types[i][1].maxLength! < payload[types[i][0]].length) return { message: `Ошибка при проверке полученных данных. Поле "${types[i][0]}" имеет значение больше ожидаемого.`, error: true }
        }
        if (types[i][1].type === "boolean") {
          if (typeof payload[types[i][0]] !== "boolean") return { message: `Ошибка при проверке полученных данных. Поле "${types[i][0]}" имеет значение меньше ожидаемого.`, error: true }
        }
      }
    }
    return result
  }
  listen(port: string) {
    this.server.listen(this.normalizePort(port), () => {
      if (process.env.VAR_DEBUG) console.log(`HTTP server started listen port ${port}`)
    })
  }
  use(routes: iRoute[]) {
    routes.forEach(r => {
      let url: string = ""
      if (/\?/.test(r.url)) url = r.url.split("?")[0]
      else url = r.url
      this.routes.set(`${r.method}:${url}`, { ...r, reg: new RegExp(`^${r.url}$`) })
    })
  }
}
