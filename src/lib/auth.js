// lib/auth.js
export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // Usuario está autenticado, continuar con la siguiente función de middleware
  }
  res.redirect("/auth/signin"); // Usuario no está autenticado, redirigir a la página de inicio de sesión
};

export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/profile");
};
