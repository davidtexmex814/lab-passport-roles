const express = require("express");
const passport = require("passport");
const passRoutes = express.Router();
const loggedOut = require('../middlewares/loggedOut');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

passRoutes.get("/signup", loggedOut('/specialpage'), (req, res, next) => {
  res.render("pass/signup");
});

passRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("pass/signup", { message: "username and password" });
    reject();
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) throw new Error("The username already exists");
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass
      });
      return newUser.save();
    })
    .then(newUser => {
      res.redirect("/");
    })
    .catch(e => {
      res.render("pass/signup", { message: e.message });
    });
});

passRoutes.get("/login", loggedOut("/"), (req, res, next) => {
  res.render("pass/login");
});

passRoutes.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/pass/login",
    failureFlash: false,
    passReqToCallback: false
  })
);

passRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

passRoutes.get("/createUsers", (req, res, next) => {
  res.render("pass/createUsers");
});

passRoutes.post("/createUsers", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("pass/createUsers", { message: "username and password" });
    reject();
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) throw new Error("The username already exists");
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass
      });
      return newUser.save();
    })
    .then(newUser => {
      res.redirect("/");
    })
    .catch(e => {
      res.render("pass/createUsers", { message: e.message });
    });
});

module.exports = passRoutes;
