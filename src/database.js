import mysql from "mysql2";
import { promisify } from "util";
import { database } from "../src/keys.js";

// Crear un pool de conexiones
const pool = mysql.createPool(database);

// Configurar el pool para usar Promesas
pool.query = promisify(pool.query);

// Manejar eventos de conexión
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("DATABASE CONNECTION WAS CLOSED");
    } else if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("DATABASE HAS TOO MANY CONNECTIONS");
    } else if (err.code === "ECONNREFUSED") {
      console.error("DATABASE CONNECTION WAS REFUSED");
    } else {
      console.error("DATABASE CONNECTION ERROR:", err);
      return;
    }

    if (connection) {
      connection.query("SET time_zone = 'America/Bogota'");
      connection.release();
    }
    console.log("DB IS CONNECTED");
  }
});

export default pool;
