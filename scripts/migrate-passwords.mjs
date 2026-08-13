/**
 * Script migrasi satu kali: hash semua password admin yang masih plaintext di database.
 * Jalankan dengan: node scripts/migrate-passwords.mjs
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");
const path = require("path");
const { fileURLToPath } = require("url");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "../prisma/dev.db");

const db = new Database(dbPath);

const admins = db.prepare("SELECT id, email, password FROM Admin").all();

console.log(`Found ${admins.length} admin account(s) to check.`);

let migrated = 0;
for (const admin of admins) {
  // bcrypt hashes start with $2b$ or $2a$ — skip if already hashed
  if (admin.password.startsWith("$2b$") || admin.password.startsWith("$2a$")) {
    console.log(`  [SKIP] ${admin.email} — already hashed`);
    continue;
  }

  const hashed = bcrypt.hashSync(admin.password, 12);
  db.prepare("UPDATE Admin SET password = ? WHERE id = ?").run(hashed, admin.id);
  console.log(`  [OK]   ${admin.email} — password hashed`);
  migrated++;
}

db.close();
console.log(`\nMigration complete. ${migrated} password(s) hashed.`);
