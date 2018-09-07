const router = require("express").Router();
const Student = require("../models/Student");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error_msg", "You are not logged in");
    res.redirect("/user/login");
  }
}
router.use(ensureAuthenticated);

router
  .route("/")
  .get((req, res) => {
    Student.find()
      .sort({ no: 1 })
      .then(docs => {
        res.render("students", {
          search: "active",
          student: docs
        });
      })
      .catch(err => {
        console.log(err);
      });
  })
  .post((req, res) => {
    const request = req.body.searchOption;
    const value = new RegExp(`.*${req.body.searchValue}.*`, "i");
    console.log(value);
    console.log(request);
    switch (request) {
      case "Student Name":
        Student.find({ name: value }).then(doc => {
          res.render("students", {
            search: "active",
            student: doc,
            message: `The result from "${req.body.searchValue}"`
          });
        });
        break;
      case "Grade":
        Student.find({ grade: req.body.searchValue }).then(doc => {
          res.render("students", {
            search: "active",
            student: doc,
            message: `The result from "${req.body.searchValue}"`
          });
        });
        break;
      case "Course":
        Student.find({ course: value }).then(doc => {
          res.render("students", {
            search: "active",
            student: doc,
            message: `The result from "${req.body.searchValue}"`
          });
        });
        break;
      case "Parent Name":
        Student.find({ parentName: value }).then(doc => {
          res.render("students", {
            search: "active",
            student: doc,
            message: `The result from "${req.body.searchValue}"`
          });
        });
        break;
      case "Parent Phone":
        Student.find({ parentPhone: value }).then(doc => {
          res.render("students", {
            search: "active",
            student: doc,
            message: `The result from "${req.body.searchValue}"`
          });
        });
        break;
      case "Student Phone":
        Student.find({ phone: value }).then(doc => {
          res.render("students", {
            search: "active",
            student: doc,
            message: `The result from "${req.body.searchValue}"`
          });
        });
        break;
      case "Parent Email":
        Student.find({ parentEmail: value }).then(doc => {
          res.render("students", {
            search: "active",
            student: doc,
            message: `The result from "${req.body.searchValue}"`
          });
        });
        break;
      default:
        req.flash("error", 'Please Choose "Find By" category');
        res.redirect("/search");
        break;
    }
  });

module.exports = router;
