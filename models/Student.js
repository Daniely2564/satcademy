const mongoose = require("mongoose");
const { Schema } = mongoose;
const config = require("../Config/config");
mongoose.Promise = global.Promise;

mongoose
  .connect(config.db)
  .then(() => {
    console.log(`Mongoose is connected...`);
  })
  .catch(err => {
    console.log(`There was an error connecting to the mongoose\n`, err);
  });

const schema = new Schema({
  no: Number,
  name: String,
  birthday: String,
  address: String,
  email: String,
  homephone: String,
  phone: String,
  enrolledDate: {
    type: String,
    default: `${new Date().getFullYear()}-${new Date().getMonth() +
      1}-${new Date().getDate()}`
  },
  category: {
    type: String,
    default: "hr"
  },
  startDate: String,
  endDate: String,
  week: Array,
  parentName: String,
  parentEmail: String,
  parentPhone: String,
  parentOfficeTel: String,
  emergencyName: String,
  emergencyPhone: String,
  getToKnow: Array,
  referralName: String,
  school: String,
  grade: String,
  yearsInUSA: String,
  currentEnglish: String,
  currentMath: String,
  currentScience: String,
  currentHistory: String,
  njaskReading: String,
  njaskWriting: String,
  njaskMath: String,
  satReading: String,
  satWriting: String,
  satMath: String,
  satSATII: String,
  course: Array,
  subForTutor: String,
  numSession: String,
  numHour: String,
  tutorTime: Array,
  note: String,
  w: Number,
  sat: {
    type: Array,
    default: {
      reading: "200",
      writing: "200",
      math: "400",
      test: "",
      date: "",
      no: "",
      type: ""
    }
  },
  act: {
    type: Array,
    default: {
      english: 20,
      writing: 20,
      math: 20,
      test: "",
      date: "",
      no: "",
      type: ""
    }
  },
  satII: Array
});

module.exports = mongoose.model("student", schema);
