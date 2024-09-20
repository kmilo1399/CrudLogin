import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import { engine } from "express-handlebars";

// Importa las rutas
import router from "./routes/index.js";
import links from "./routes/links.js";
import auth from "./routes/auth.js";
import routerApi from "./routes/api/index.js";
import pass from "./lib/passport.js";
import helpers from "./lib/handlebars.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuraciones de Express
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

// Configuración del motor de plantillas Handlebars
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: helpers,
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración de express-session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Variables globales para las vistas
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Rutas
app.use("/", router);
app.use("/auth", auth);
app.use("/links", links);
app.use("/api", routerApi);

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Iniciar servidor
app.listen(app.get("port"), () => {
  console.log("Server running on port", app.get("port"));
});
