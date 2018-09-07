const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const helpers = require("./hbsHelpers");
const validator = require("express-validator");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
  })
);

app.set("view engine", "hbs");
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/icon", express.static(__dirname + "/public/icon"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  validator({
    errorFormatter: function(param, message, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + `]`;
      }

      return {
        param: formParam,
        message: message,
        value: value
      };
    }
  })
);
app.use(flash());

app.use(function(req, res, next) {
  res.locals.message = req.flash("message");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// index...
const index = require("./routes/index");
app.use("/", index);

// students..
const search = require("./routes/search");
app.use("/search", search);

//register..
const register = require("./routes/register");
app.use("/register", register);

//grading..
const grading = require("./routes/grading");
app.use("/grading", grading);

const user = require("./routes/user");
app.use("/user", user);

app.listen(process.env.PORT || 3000, err => {
  console.log(`The app is running on ${process.env.PORT || 3000}`);
});
