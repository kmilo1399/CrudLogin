import express from "express";
import multer from "multer";
import path from "path";
import pool from "../database.js"; 
import { isLoggedIn } from "../lib/auth.js";

const router = express.Router();

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

// Middleware de subida de archivos
const upload = multer({ storage: storage });

// Ruta GET para mostrar el formulario
router.get("/add", isLoggedIn, (req, res) => {
  req.flash("success", "link saved successfully");
  res.render("links/add"); 
});

// Ruta POST para manejar la subida del formulario y archivo
router.post("/add", upload.single("imagen"), async (req, res) => {
  const { nombre, serie, precio, descripcion } = req.body;
  const imagen = req.file ? req.file.filename : null; 

  try {
    await pool.query(
      "INSERT INTO smartphone (nombre, serie, precio, descripcion, imagen, user_id) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, serie, precio, descripcion, imagen, req.user.id]
    );
    res.redirect("/links");
  } catch (err) {
    console.error("Error al agregar el celular:", err);
    res.status(500).send("Error al agregar el celular");
  }
});

router.get("/", isLoggedIn, async (req, res) => {
  const newsmartphone = await pool.query(
    "SELECT * FROM smartphone WHERE user_id = ?",
    [req.user.id]
  );
  console.log(newsmartphone);
  res.render("links/list", { newsmartphone });
});

router.get("/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM smartphone WHERE ID = ?", [id]);
  res.redirect("/links");
});

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const smartphones = await pool.query(
    "SELECT * FROM smartphone WHERE id = ?",
    [id]
  );
  res.render("links/edit", { smartphone: smartphones[0] });
});

router.post(
  "/edit/:id",
  isLoggedIn,
  upload.single("imagen"),
  async (req, res) => {
    const { id } = req.params;
    const { nombre, serie, precio, descripcion } = req.body;
    const imagen = req.file ? req.file.filename : null;

    try {
      if (!imagen) {
        const existingImage = await pool.query(
          "SELECT imagen FROM smartphone WHERE id = ?",
          [id]
        );
        await pool.query(
          "UPDATE smartphone SET nombre = ?, serie = ?, precio = ?, descripcion = ? WHERE id = ?",
          [nombre, serie, precio, descripcion, id]
        );
      } else {
        // Actualiza el registro en la base de datos
        await pool.query(
          "UPDATE smartphone SET nombre = ?, serie = ?, precio = ?, descripcion = ?, imagen = ? WHERE id = ?",
          [nombre, serie, precio, descripcion, imagen, id]
        );
      }
      res.redirect("/links");
    } catch (err) {
      console.error("Error al actualizar el celular:", err);
      res.status(500).send("Error al actualizar el celular");
    }
  }
);

export default router;
