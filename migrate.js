import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "example",
  database: process.env.DB_NAME || "smartphone",
};

const connectWithRetry = async (retries = 5, delay = 5000) => {
  let connection;
  while (retries > 0) {
    try {
      connection = await mysql.createConnection(config);
      return connection;
    } catch (err) {
      console.error(
        `Error al conectar a la base de datos. Reintentando en ${
          delay / 1000
        } segundos...`
      );
      retries -= 1;
      if (retries === 0) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

const runMigrations = async () => {
  const connection = await connectWithRetry();

  try {
    const [tables] = await connection.query("SHOW TABLES LIKE 'migrations'");
    if (tables.length === 0) {
      await connection.query(`
        CREATE TABLE migrations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("Tabla de migraciones creada.");
    }

    const migrationsDir = path.join(__dirname, "migrations");
    const files = fs.readdirSync(migrationsDir);

    for (const file of files) {
      const migrationFilePath = path.join(migrationsDir, file);
      const migrationName = path.basename(file);

      const [executedMigrations] = await connection.query(
        "SELECT * FROM migrations WHERE name = ?",
        [migrationName]
      );
      if (executedMigrations.length > 0) {
        console.log(`La migración "${migrationName}" ya ha sido ejecutada.`);
        continue;
      }

      const migrationSql = fs.readFileSync(migrationFilePath, "utf8");
      const migrationStatements = migrationSql
        .split(";")
        .filter((stmt) => stmt.trim());

      for (const statement of migrationStatements) {
        await connection.query(statement);
      }
      console.log(`Migración "${migrationName}" ejecutada.`);

      await connection.query("INSERT INTO migrations (name) VALUES (?)", [
        migrationName,
      ]);
    }
  } catch (err) {
    console.error("Error al ejecutar migraciones:", err);
  } finally {
    await connection.end();
  }
};

runMigrations();
