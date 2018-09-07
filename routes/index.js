const router = require("express").Router();
const Student = require("../models/Student");
const request = require("request-promise");
const nodemailer = require("nodemailer");
const config = require("../Config/config");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error_msg", "You are not logged in");
    res.redirect("/user/login");
  }
}

router.route("/").get((req, res) => {
  res.render("index", {
    index: "active"
  });
});

router.route("/student/:id").get(ensureAuthenticated, (req, res) => {
  const id = req.params.id;
  Student.findById(id)
    .then(doc => {
      res.render("oneStudent", {
        student: doc
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router
  .route("/edit/:id")
  .get(ensureAuthenticated, (req, res) => {
    const id = req.params.id;
    Student.findById(id)
      .then(doc => {
        res.render("edit", {
          student: doc
        });
      })
      .catch(err => {
        console.log(err);
      });
  })
  .post(ensureAuthenticated, (req, res) => {
    const id = req.params.id;
    Student.findById(id)
      .then(newStudent => {
        newStudent.name = req.body.name;
        newStudent.email = req.body.email;
        newStudent.grade = req.body.grade;
        newStudent.phone = req.body.phone;
        newStudent.birthday = req.body.birthday;
        let courses = [];
        req.body.course.forEach(cour => {
          if (cour !== "") {
            courses.push(cour);
          }
        });
        newStudent.course = courses;
        newStudent.week = req.body.week;
        newStudent.enrolledDate = req.body.enrolledDate;
        newStudent.parentName = req.body.parentName;
        newStudent.parentPhone = req.body.parentPhone;
        newStudent.parentEmail = req.body.parentEmail;
        newStudent.note = req.body.note;
        newStudent.startDate = req.body.startDate;
        newStudent.endDate = req.body.endDate;
        newStudent.address = req.body.address;
        newStudent.homephone = req.body.homephone;
        newStudent.parentOfficeTel = req.body.parentOfficeTel;
        newStudent.emergencyName = req.body.emergencyName;
        newStudent.emergencyPhone = req.body.emergencyPhone;
        newStudent.getToKnow = req.body.getToKnow;
        newStudent.referralName = req.body.referralName;
        newStudent.school = req.body.school;
        newStudent.yearsInUSA = req.body.yearsInUSA;
        newStudent.currentEnglish = req.body.currentEnglish;
        newStudent.currentMath = req.body.currentMath;
        newStudent.currentScience = req.body.currentScience;
        newStudent.currentHistory = req.body.currentHistory;
        newStudent.njaskReading = req.body.njaskReading;
        newStudent.njaskWriting = req.body.njaskWriting;
        newStudent.njaskMath = req.body.njaskMath;
        newStudent.satReading = req.body.satReading;
        newStudent.satWriting = req.body.satWriting;
        newStudent.satMath = req.body.satMath;
        newStudent.satSATII = req.body.satSATII;
        newStudent.subForTutor = req.body.subForTutor;
        newStudent.numSession = req.body.numSession;
        newStudent.numHour = req.body.numHour;
        newStudent.tutorTime = req.body.tutorTime;
        newStudent.category = req.body.category;

        newStudent
          .save()
          .then(student => {
            res.render("oneStudent", {
              message: "It was successfully updated",
              student: student
            });
          })
          .catch(err => {
            console.log(err);
            console.log("err in the first one...");
          });
      })
      .catch(err => {
        console.log(err);
        console.log("Err in the second one...");
      });
  });
router.route("/delete/:id").get(ensureAuthenticated, (req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      Student.deleteOne({ _id: req.params.id })
        .then(student => {
          console.log(student);
        })
        .catch(err => {
          console.log(err);
        });
      switch (student.category) {
        case "hr":
          req.flash("message", `One Student was deleted successfully...`);
          res.redirect("/search/hr");
          break;
        case "ubf":
          req.flash("message", `One Student was deleted successfully...`);
          res.redirect("/search/ubf");
          break;
        case "fall":
          req.flash("message", "Student was deleted Successfully...");
          res.redirect("/search/category/fall");
          break;
      }
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
