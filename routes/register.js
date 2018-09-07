const express = require("express");
const router = express.Router();
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
  .route("/student")
  .get((req, res) => {
    res.render("register", {
      register: "active"
    });
  })
  .post((req, res) => {
    const newStudent = new Student();
    newStudent.name = req.body.name;
    newStudent.email = req.body.email;
    newStudent.grade = req.body.grade;
    newStudent.phone = req.body.phone;
    newStudent.birthday = req.body.birthday;
    newStudent.course = req.body.course;
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

    Student.find()
      .count()
      .then(num => {
        newStudent.no = num + 1;
        newStudent
          .save()
          .then(doc => {
            console.log("Saved successfully");
            req.flash("message", "It has been saved successfully!");
            res.redirect("/search");
          })
          .catch(err => {
            console.log(err);
          });
      });
  });

router.route("/contactInfo").get((req, res) => {
  Student.find({ category: "hr" })
    .then(student => {
      res.render("contactInfo", {
        student,
        h1: "SATCADEMY students <br/> Contact Info"
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
