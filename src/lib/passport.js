import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import pool from "../database.js";
import helpers from "../lib/helpers.js";

// Estrategia de SignIn
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        console.log(req.body);
        const rows = await pool.query(
          "SELECT * FROM user WHERE username = ?",
          [username]
        );
        if (rows.length > 0) {
          const user = rows[0];
          const validPassword = await helpers.matchPassword(
            password,
            user.password
          );
          if (validPassword) {
            done(null, user, req.flash("success", "welcome " + user.username));
          } else {
            done(null, false, req.flash("message", "Incorrect Password"));
          }
        } else {
          return done(
            null,
            false,
            req.flash("message", "The Username does not exists")
          );
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Estrategia de SignUp (la tuya original)
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const { fullname } = req.body;
        const newUser = {
          username,
          password,
          fullname,
        };
        newUser.password = await helpers.encryptPassword(password);
        const result = await pool.query("INSERT INTO user SET ?", [
          newUser,
        ]);
        newUser.id = result.insertId;
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const rows = await pool.query("SELECT * FROM user WHERE id = ?", [
      id,
    ]);
    done(null, rows[0]);
  } catch (error) {
    done(error);
  }
});

export default passport;
