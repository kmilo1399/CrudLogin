import express from "express";
import passport from "passport";
import { isNotLoggedIn } from "../lib/auth.js";

const router = express.Router();

router.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("auth/signup", {
    message: req.flash("message"),
    success: req.flash("success"),
  });
});

router.post("/signup", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/auth/signup",
    failureFlash: true,
    successFlash: "Signup successful!",
  })(req, res, next);
});

router.get("/signin", isNotLoggedIn, (req, res) => {
  res.render("auth/signin", {
    message: req.flash("message"),
    success: req.flash("success"),
  });
});

router.post("/signin", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/auth/signin",
    failureFlash: true,
    successFlash: "Welcome back!",
  })(req, res, next);
});

export default router;
