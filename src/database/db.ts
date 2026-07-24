import Database from "better-sqlite3";

const db = new Database("casino.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  balance INTEGER DEFAULT 1000,
  lastDaily INTEGER DEFAULT 0
)
`).run();

export default db;
