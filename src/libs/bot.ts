import { Context, Telegraf } from 'telegraf'

if (!process.env.VAR_BOT_TOKEN) throw new Error("VAR_BOT_TOKEN is undefined")

export interface iDefaultEnvs {
  VAR_TOKEN: string
}

export const bot = new Telegraf(process.env.VAR_BOT_TOKEN)