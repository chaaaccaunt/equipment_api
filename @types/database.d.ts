import type { iDatabase, Database } from "@/database"

declare global {
  declare namespace iModels {
    type Models<T extends keyof iDatabase> = iDatabase[T]
    type Database = typeof Database
  }
}

export { }