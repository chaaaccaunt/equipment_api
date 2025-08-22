import type { iDefaultEnvs } from "@/bin"
import { iHTTPServer } from "@/libs";

declare global {
  declare namespace NodeJS {
    interface ProcessEnv extends iDefaultEnvs, iHTTPServer {
    }
  }
}