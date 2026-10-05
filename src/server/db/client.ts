import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

import * as schema from "@/server/db/schema";

const databasePath = process.env.DEMO_DATABASE_PATH ?? "data/sun-star-demo.sqlite";
const sqlite = new Database(databasePath, { create: true });

sqlite.run("PRAGMA foreign_keys = ON");
sqlite.run("PRAGMA journal_mode = WAL");

export const db = drizzle({ client: sqlite, schema });
export { sqlite };
