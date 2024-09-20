import express from "express";
import routerLogin from "./login/login.js";
import statusCode from "../../utils/statusCode.js";
// * Routes 
import routerUser from "./user/index.js";

const routerApi = express.Router();

// Ruta principal para verificar que el servidor funciona
routerApi.get("/", (req, res) => {
  res.status(statusCode.ok).send("hello");
});

// Agregar rutas de la API
routerApi.use("/login", routerLogin);


routerApi.use("/user", routerUser);
export default routerApi
