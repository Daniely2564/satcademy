const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

router
  .route("/register")
  .get((req, res) => {
    res.render("user/index");
  })
  .post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const username = req.body.username;
    const code = req.body.code;
    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    req
      .checkBody("password2", "Passwords do not match")
      .equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
      res.render("user/index", {
        errors: errors
      });
    } else {
      let newUser = new User();
      newUser.username = username;
      newUser.name = name;
      newUser.email = email;
      newUser.password = password;
      User.createUser(newUser, function(err, user) {
        if (err) return err;
        console.log(user, "User Saved Successfully");
      });
      req.flash("success_msg", "You can Now log in!");
      res.redirect("/user/login");
    }
  });
passport.use(
  new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: `Unknown user.` });
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: `Invalid Password` });
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router
  .route("/login")
  .get(function(req, res) {
    res.render("user/login");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/user/login",
      failureFlash: true
    }),
    function(req, res) {
      res.redirect("/");
    }
  );

router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success_msg", "You are logged out!");
  res.redirect("/user/login");
});

module.exports = router;
