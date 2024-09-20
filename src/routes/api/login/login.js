import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../../../database.js"; // Asegúrate de que esta ruta esté correcta
import statusCode from "../../../utils/statusCode.js";

const routerLogin = express.Router();

routerLogin.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(statusCode.badRequest)
      .json({ message: "Por favor, proporciona username y contraseña" });
  }

  try {
    console.log("Consultando usuario:", username);

    // Ejecuta la consulta
    const [rows] = await pool.query("SELECT * FROM user WHERE username = ?", [
      username,
    ]);

    // Verifica qué tipo de respuesta obtenemos: si es un arreglo o un objeto
    console.log(
      "Tipo de respuesta SQL:",
      Array.isArray(rows) ? "Array" : typeof rows
    );
    console.log("Resultado de la consulta SQL:", rows);

    // Verifica si `rows` es un array y contiene resultados
    const user = Array.isArray(rows) ? rows[0] : rows;

    if (!user) {
      console.log("Usuario no encontrado:", username);
      return res
        .status(statusCode.unauthorized)
        .json({ message: "Usuario no encontrado" });
    }

    console.log("Usuario encontrado:", user);

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Contraseña incorrecta para el usuario:", username);
      return res
        .status(statusCode.unauthorized)
        .json({ message: "Contraseña incorrecta" });
    }

    // Genera el token JWT
    const token = jwt.sign({ userId: user.id }, "secreto", { expiresIn: "1h" });

    console.log("Login exitoso para el usuario:", username);
    res.json({ token, message: "Login exitoso" });
  } catch (error) {
    console.error("Error del servidor:", error);
    res
      .status(statusCode.internalServerError)
      .json({ message: "Error del servidor" });
  }
});

export default routerLogin;
