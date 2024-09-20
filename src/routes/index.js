import express from "express";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "../lib/auth.js";
const router = express.Router();

router.get("/", isLoggedIn, (req, res) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/signin");
  });
});

export default router;
