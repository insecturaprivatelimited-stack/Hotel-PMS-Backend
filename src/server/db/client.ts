import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "@/server/db/schema";

const databasePath = process.env.DEMO_DATABASE_PATH ?? "data/sun-star-demo-v3.sqlite";
const sqlite = new Database(databasePath);

sqlite.exec("PRAGMA foreign_keys = ON");
sqlite.exec("PRAGMA journal_mode = WAL");

export const db = drizzle({ client: sqlite, schema });
export { sqlite };
