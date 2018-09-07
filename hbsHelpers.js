const handlebars = require("handlebars");

handlebars.registerHelper("adjustCourse", function(course) {
  let courses = (course + "").split(",");
  let result = "";
  for (let c of courses) {
    if (c !== "") {
      result += c + "/";
    }
  }

  return result;
});

handlebars.registerHelper("adjustCourse2", function(course) {
  let courses = (course + "").split(",");
  let result = "";
  for (let c of courses) {
    if (c !== "") {
      result += `<p class="lead">` + c + "</p>";
    }
  }

  return result;
});

handlebars.registerHelper("adjustCourse2", function(course) {
  let courses = (course + "").split(",");
  let result = "";
  for (let c of courses) {
    if (c !== "") {
      result += '<p class="lead">' + c + "</p>";
    }
  }

  return result;
});

handlebars.registerHelper("adjustWeek", function(week) {
  const days = (week + "").split(",");
  let result = "";
  for (let i = 1; i <= 9; i++) {
    if (days.includes(i + "")) {
      result += `<div class="bg-primary float-left" style="width:11%">O</div>`;
    } else {
      result += `<div class="bg-danger float-left" style="width:11%">X</div>`;
    }
  }

  return new handlebars.SafeString(result);
});

handlebars.registerHelper("totalWeek", function(week) {
  const days = (week + "").split(",");
  let count = 0;
  for (let day of days) {
    if (day !== "") count++;
  }
  return days.length;
});

handlebars.registerHelper("satScores", function(sat) {
  let display = `<div style="display:none"><div id="total">${sat.length}</div>`;
  for (let i = 0; i < sat.length; i++) {
    display += `<div id="grade-${i}">
                        <div id="grade-${i}-reading">${sat[i].reading}</div>
                        <div id="grade-${i}-writing">${sat[i].writing}</div>
                        <div id="grade-${i}-math">${sat[i].math}</div>
                        <div id="grade-${i}-test">${sat[i].test}</div>
                        <div id="grade-${i}-type">${sat[i].type}</div>
                    </div>`;
  }
  return new handlebars.SafeString(display + "</div>");
});

handlebars.registerHelper("satRecords", function(student) {
  let display = `<div class="container pb-5"><h1 class="text-center p-4">SAT History</h1><div class="row">`;
  student.sat.forEach(function(item) {
    display += `<p class="col-4 text-center"><a href="/grading/record/${
      student.id
    }/${item["no"]}" class="text-dark">${item["no"]}. ${item["date"]}<a></p>`;
  });
  display += `</div></div>`;

  return new handlebars.SafeString(display);
});

handlebars.registerHelper("satUBFRecords", function(student) {
  let display = `<div class="container pb-5"><h1 class="text-center p-4">SAT History</h1><div class="row">`;
  student.sat.forEach(function(item) {
    display += `<p class="col-4 text-center"><a href="/extra/sat/${
      student.id
    }/${item["no"]}" class="text-dark">${item["no"]}. ${item["date"]}<a></p>`;
  });
  display += `</div></div>`;

  return new handlebars.SafeString(display);
});

handlebars.registerHelper("referral", function(student) {
  let items = ["referral", "newspaper", "flyer", "website"];
  let html = "";
  items.forEach(item => {
    html += `
        <label class="checkbox-inline mr-2">
            <input type="checkbox" value=${item} name="getToKnow" class="mr-1" ${
      student.getToKnow.includes(item) ? "checked" : ""
    }>${item}
        </label>`;
  });

  return new handlebars.SafeString(html);
});

handlebars.registerHelper("editWeek", function(student) {
  let weeks = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let html = "";
  if (student.week.length === 1) {
    weeks.forEach(week => {
      html += `
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" name="week" value="${week}" ${
        student.week[0].includes(week) ? "checked" : ""
      }>
                <label class="form-check-label" for="inlineCheckbox1">${week}</label>
                </div>
            `;
    });
  } else {
    weeks.forEach(week => {
      html += `
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" name="week" value="${week}" ${
        student.week.includes(week) ? "checked" : ""
      }>
                <label class="form-check-label" for="inlineCheckbox1">${week}</label>
                </div>
            `;
    });
  }
  return new handlebars.SafeString(html);
});

handlebars.registerHelper("renderCourses", schedule => {
  let html = "";

  schedule.course.forEach(item => {
    html += `<div class="${schedule.room} ${item.color} ${item.startTime} ${
      item.hour
    } bg-success text-dark ">${item.class}<br>${item.teacher}</div>`;
  });

  return new handlebars.SafeString(html);
});

handlebars.registerHelper("satscores", student => {
  let html = `<tr>
                <td><a href="/student/${
                  student._id
                }" style="text-decoration:none">${student.name}</a></td><td>${
    student.week
  }</td>`;
  let sat = student.sat[1];
  if (sat) {
    html += `<td>${sat.reading}</td>
                <td>${sat.writing}</td>
                <td>${sat.math}</td>
                <td>${new Number(sat.reading) +
                  new Number(sat.writing) +
                  new Number(sat.math)}</td>
            </tr>`;
  } else {
    html += `<td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
            </tr>`;
  }

  return new handlebars.SafeString(html);
});

handlebars.registerHelper("binder", function(student) {
  let html = "";
  for (let i = 0; i < student.length; i += 2) {
    html += `<tr>
                <td style="font-size:110%"><img src="/img/logo.jpg" width="65px" height="65px"/> ${
                  student[i].name
                }</td>
                <td style="font-size:110%"><img src="/img/logo.jpg" width="65px" height="65px"/> ${
                  student[i + 1] ? `${student[i + 1].name}` : ""
                }</td>
               </tr>`;
  }

  return new handlebars.SafeString(html);
});

handlebars.registerHelper("submit", function(record) {
  let html =
    '<h1 class="text-left">Reading</h1><div class="row h4 text-dark text-left"><div class="col-3">';
  for (let i = 1; i <= 14; i++) {
    html += `${i}.&nbsp;<span class="text-dark">${
      record["reading" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 15; i <= 28; i++) {
    html += `${i}.<span class="text-dark">${record["reading" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 29; i <= 42; i++) {
    html += `${i}.<span class="text-dark">${record["reading" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 43; i <= 52; i++) {
    html += `${i}.<span class="text-dark">${record["reading" + i]}</span><br>`;
  }
  html += "</div></div>";

  html +=
    '<h1 class="text-left">Writing</h1><div class="row h4 text-dark text-left"><div class="col-3">';
  for (let i = 1; i <= 11; i++) {
    html += `${i}.&nbsp;<span class="text-dark">${
      record["writing" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 12; i <= 22; i++) {
    html += `${i}.<span class="text-dark">${record["writing" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 23; i <= 33; i++) {
    html += `${i}.<span class="text-dark">${record["writing" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 34; i <= 44; i++) {
    html += `${i}.<span class="text-dark">${record["writing" + i]}</span><br>`;
  }
  html += "</div></div>";

  html +=
    '<h1 class="text-left">Math No Cal</h1><div class="row h4 text-dark text-left"><div class="col-3">';
  for (let i = 1; i <= 5; i++) {
    html += `${i}.&nbsp;<span class="text-dark">${
      record["mathnoc" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 6; i <= 10; i++) {
    html += `${i}.<span class="text-dark">${record["mathnoc" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 11; i <= 15; i++) {
    html += `${i}.<span class="text-dark">${record["mathnoc" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 16; i <= 20; i++) {
    html += `${i}.<span class="text-dark">${record["mathnoc" + i]}</span><br>`;
  }
  html += "</div></div>";

  html +=
    '<h1 class="text-left">Math With Cal</h1><div class="row h4 text-dark text-left"><div class="col-3">';
  for (let i = 1; i <= 10; i++) {
    html += `${i}.&nbsp;<span class="text-dark">${
      record["mathwic" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 11; i <= 20; i++) {
    html += `${i}.<span class="text-dark">${record["mathwic" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 21; i <= 30; i++) {
    html += `${i}.<span class="text-dark">${record["mathwic" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 31; i <= 38; i++) {
    html += `${i}.<span class="text-dark">${record["mathwic" + i]}</span><br>`;
  }
  html += "</div></div>";

  return new handlebars.SafeString(html);
});

handlebars.registerHelper("actScores", function(act) {
  let display = `<div style="display:none"><div id="acttotal">${
    act.length
  }</div>`;
  for (let i = 0; i < act.length; i++) {
    display += `<div id="grade-${i}">
                        <div id="grade-${i}-reading">${act[i].english}</div>
                        <div id="grade-${i}-writing">${act[i].math}</div>
                        <div id="grade-${i}-math">${sat[i].reading}</div>
                        <div id="grade-${i}-test">${sat[i].science}</div>
                        <div id="grade-${i}-type">${sat[i].test}</div>
                        <div id="grade-${i}-type">${sat[i].type}</div>
                    </div>`;
  }
  return new handlebars.SafeString(display + "</div>");
});

handlebars.registerHelper("actRecords", function(student) {
  let display = `<div class="container pb-5"><h1 class="text-center p-4">ACT History</h1><div class="row">`;
  student.act.forEach(function(item) {
    display += `<p class="col-4 text-center"><a href="/grading/act/${
      student.id
    }/${item["no"]}" class="text-dark">${item["no"]}. ${item["date"]}<a></p>`;
  });
  display += `</div></div>`;

  return new handlebars.SafeString(display);
});

handlebars.registerHelper("submitACT", function(record) {
  let html =
    '<h1 class="text-left">English</h1><div class="row h4 text-dark text-left"><div class="col-3">';
  for (let i = 1; i <= 20; i++) {
    html += `${i}.&nbsp;<span class="text-dark">${
      record["english" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 21; i <= 40; i++) {
    html += `${i}.<span class="text-dark">${record["english" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 41; i <= 60; i++) {
    html += `${i}.<span class="text-dark">${record["english" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 61; i <= 75; i++) {
    html += `${i}.<span class="text-dark">${record["english" + i]}</span><br>`;
  }
  html += "</div></div>";

  html +=
    '<h1 class="text-left">Math</h1><div class="row h4 text-dark text-left"><div class="col-3">';
  for (let i = 1; i <= 15; i++) {
    html += `${i}.&nbsp;<span class="text-dark">${
      record["math" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 16; i <= 30; i++) {
    html += `${i}.<span class="text-dark">${record["math" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 31; i <= 45; i++) {
    html += `${i}.<span class="text-dark">${record["math" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 46; i <= 60; i++) {
    html += `${i}.<span class="text-dark">${record["math" + i]}</span><br>`;
  }
  html += "</div></div>";

  html +=
    '<h1 class="text-left">Reading</h1><div class="row h4 text-dark text-left"><div class="col-3">';
  for (let i = 1; i <= 10; i++) {
    html += `${i}.&nbsp;<span class="text-dark">${
      record["reading" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 11; i <= 20; i++) {
    html += `${i}.<span class="text-dark">${record["reading" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 21; i <= 30; i++) {
    html += `${i}.<span class="text-dark">${record["reading" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 31; i <= 40; i++) {
    html += `${i}.<span class="text-dark">${record["reading" + i]}</span><br>`;
  }
  html += "</div></div>";

  html +=
    '<h1 class="text-left">Science</h1><div class="row h4 text-dark text-left"><div class="col-3">';
  for (let i = 1; i <= 10; i++) {
    html += `${i}.&nbsp;<span class="text-dark">${
      record["science" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 11; i <= 20; i++) {
    html += `${i}.<span class="text-dark">${record["science" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 21; i <= 30; i++) {
    html += `${i}.<span class="text-dark">${record["science" + i]}</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 31; i <= 40; i++) {
    html += `${i}.<span class="text-dark">${record["science" + i]}</span><br>`;
  }
  html += "</div></div>";

  return new handlebars.SafeString(html);
});

handlebars.registerHelper("editSAT", submit => {
  let html = '<h1>Reading</h1><div class="row"><div class="col-3">';
  for (let i = 1; i < 52; i++) {
    html += `<div>${i}.<input type="text" value="${
      submit["reading" + i].includes("->")
        ? submit["reading" + i].substring(
            0,
            submit["reading" + i].indexOf("->")
          )
        : submit["reading" + i]
    }" name="${"reading" + i}" onkeyup="focusnext(this,${"reading" +
      (i + 1)})"  maxlength="1"></div>`;
    if (i % 14 === 0 && i !== 52) {
      html += '</div><div class="col-3">';
    }
  }
  html += `<div>${52}.<input type="text" value="${
    submit["reading" + 52].includes("->")
      ? submit["reading" + 52].substring(
          0,
          submit["reading" + 52].indexOf("->")
        )
      : submit["reading" + 52]
  }" name="${"reading" + 52}" onkeyup="focusnext(this,${"writing" +
    1})"  maxlength="1"></div>
    </div></div><h1>Writing</h1><div class="row"><div class="col-3">`;

  for (let i = 1; i < 44; i++) {
    html += `<div>${i}.<input type="text" value="${
      submit["writing" + i].includes("->")
        ? submit["writing" + i].substring(
            0,
            submit["writing" + i].indexOf("->")
          )
        : submit["writing" + i]
    }" name="${"writing" + i}" onkeyup="focusnext(this,${"writing" +
      (i + 1)})"  maxlength="1"></div>`;
    if (i % 11 === 0 && i !== 44) {
      html += '</div><div class="col-3">';
    }
  }

  html += `<div>${44}.<input type="text" value="${
    submit["writing" + 44].includes("->")
      ? submit["writing" + 44].substring(
          0,
          submit["writing" + 44].indexOf("->")
        )
      : submit["writing" + 44]
  }" name="${"writing" + 44}" onkeyup="focusnext(this,${"mathnoc" +
    1})"  maxlength="1"></div></div></div><h1>Math w/o Cal</h1><div class="row"><div class="col-3">`;

  for (let i = 1; i <= 15; i++) {
    html += `<div>${i}.<input type="text" value="${
      submit["mathnoc" + i].includes("->")
        ? submit["mathnoc" + i].substring(
            0,
            submit["mathnoc" + i].indexOf("->")
          )
        : submit["mathnoc" + i]
    }" name="${"mathnoc" + i}" onkeyup="focusnext(this,${"mathnoc" +
      (i + 1)})"  maxlength="1"></div>`;
    if (i % 5 === 0) {
      html += '</div><div class="col-3">';
    }
  }
  for (let i = 16; i < 20; i++) {
    html += `<div>${i}.<input type="text" value="${
      submit["mathnoc" + i].includes("->")
        ? submit["mathnoc" + i].substring(
            0,
            submit["mathnoc" + i].indexOf("->")
          )
        : submit["mathnoc" + i]
    }" name="${"mathnoc" + i}" onkeyup="mathnext(this,${"mathnoc" +
      (i + 1)})"  maxlength="4"></div>`;
  }
  html += `<div>${20}.<input type="text" value="${
    submit["mathnoc" + 20].includes("->")
      ? submit["mathnoc" + 20].substring(
          0,
          submit["mathnoc" + 20].indexOf("->")
        )
      : submit["mathnoc" + 20]
  }" name="${"mathnoc" + 20}" onkeyup="mathnext(this,${"mathwic" +
    1})"  maxlength="4"></div></div></div><h1>Math W/ Cal</h1><div class="row"><div class="col-3">`;

  for (let i = 1; i <= 30; i++) {
    html += `<div>${i}.<input type="text" value="${
      submit["mathwic" + i].includes("->")
        ? submit["mathwic" + i].substring(
            0,
            submit["mathwic" + i].indexOf("->")
          )
        : submit["mathwic" + i]
    }" name="${"mathwic" + i}" onkeyup="focusnext(this,${"mathwic" +
      (i + 1)})"  maxlength="1"></div>`;
    if (i % 10 === 0) {
      html += '</div><div class="col-3">';
    }
  }
  for (let i = 31; i <= 38; i++) {
    html += `<div>${i}.<input type="text" value="${
      submit["mathwic" + i].includes("->")
        ? submit["mathwic" + i].substring(
            0,
            submit["mathwic" + i].indexOf("->")
          )
        : submit["mathwic" + i]
    }" name="${"mathwic" + i}" onkeyup="mathnext(this,${"mathwic" +
      (i + 1)})"  maxlength="4"></div>`;
    if (i === 38) {
      html += `</div></div>`;
    }
  }

  return new handlebars.SafeString(html);
});

handlebars.registerHelper("resultOut", submit => {
  let html = `<div class="col-4">
                    <h4 class="text-center font-weight-bold text-dark">Reading</h4>
                    <div class="row border border-dark rounded">
                        <div class="col-3">`;
  for (let i = 1; i <= 52; i++) {
    if (i % 15 === 0) {
      html += `<div class="row border">
                        <div class="col-5 text-center">${i}</div>
                        <div class="text-center col-7 ${
                          submit["reading" + i].includes("Wrong")
                            ? "bg-danger text-white"
                            : "bg-white"
                        }">${
        submit["reading" + i].includes("Wrong")
          ? submit["reading" + i].substring(
              0,
              submit["reading" + i].indexOf("->")
            )
          : submit["reading" + i]
      }</div>
                    </div>
                    </div>
                <div class="col-3">`;
    } else {
      html += `<div class="row border">
                        <div class="col-5 border-right text-center">${i}</div>
                        <div class="text-center col-7 ${
                          submit["reading" + i].includes("Wrong")
                            ? "bg-danger text-white"
                            : "bg-white"
                        }">${
        submit["reading" + i].includes("Wrong")
          ? submit["reading" + i].substring(
              0,
              submit["reading" + i].indexOf("->")
            )
          : submit["reading" + i]
      }</div>
                    </div>`;
    }
  }
  html += "</div></div></div>";
  html += `<div class="col-3">
                    <h4 class="text-center font-weight-bold text-dark">Writing</h4>
                    <div class="row border-dark rounded border">
                        <div class="col-4">`;
  for (let i = 1; i <= 44; i++) {
    if (i % 15 === 0) {
      html += `<div class="row border">
                        <div class="col-5 text-center border-right">${i}</div>
                        <div class="col-7 text-center ${
                          submit["writing" + i].includes("Wrong")
                            ? "bg-danger text-white"
                            : "bg-white"
                        }">${
        submit["writing" + i].includes("Wrong")
          ? submit["writing" + i].substring(
              0,
              submit["writing" + i].indexOf("->")
            )
          : submit["writing" + i]
      }</div>
                    </div>
                    </div>
                <div class="col-4">`;
    } else {
      html += `<div class="row border">
                        <div class="col-5 text-center border-right">${i}</div>
                        <div class="col-7 text-center ${
                          submit["writing" + i].includes("Wrong")
                            ? "bg-danger text-white"
                            : "bg-white"
                        }">${
        submit["writing" + i].includes("Wrong")
          ? submit["writing" + i].substring(
              0,
              submit["writing" + i].indexOf("->")
            )
          : submit["writing" + i]
      }</div>
                    </div>`;
    }
  }
  html += "</div></div></div>";
  html += `<div class="col-2">
                    <h4 class="text-center text-dark font-weight-bold">Math Cal x</h4>
                    <div class="row border border-dark">
                        <div class="col-6">`;
  for (let i = 1; i <= 20; i++) {
    if (i % 15 === 0) {
      html += `<div class="row border">
                        <div class="col-5 text-center border-right">${i}</div>
                        <div class="col-7 text-center ${
                          submit["mathnoc" + i].includes("Wrong")
                            ? "bg-danger text-white"
                            : "bg-white"
                        }">${
        submit["mathnoc" + i].includes("Wrong")
          ? submit["mathnoc" + i].substring(
              0,
              submit["mathnoc" + i].indexOf("->")
            )
          : submit["mathnoc" + i]
      }</div>
                    </div>
                    </div>
                <div class="col-6">`;
    } else {
      html += `<div class="row border">
                        <div class="col-5 text-center border-right">${i}</div>
                        <div class="col-7 text-center ${
                          submit["mathnoc" + i].includes("Wrong")
                            ? "bg-danger text-white"
                            : "bg-white"
                        }">${
        submit["mathnoc" + i].includes("Wrong")
          ? submit["mathnoc" + i].substring(
              0,
              submit["mathnoc" + i].indexOf("->")
            )
          : submit["mathnoc" + i]
      }</div>
                    </div>`;
    }
  }
  html += "</div></div></div>";
  html += `<div class="col-3">
                    <h4 class="text-center font-weight-bold text-dark d-block">Math Cal o</h4>
                    <div class="row border border-dark rounded">
                        <div class="col-4">`;
  for (let i = 1; i <= 38; i++) {
    if (i % 15 === 0) {
      html += `<div class="row border">
                        <div class="col-5 text-center border-right">${i}</div>
                        <div class="col-7 text-center ${
                          submit["mathwic" + i].includes("Wrong")
                            ? "bg-danger text-white"
                            : "bg-white"
                        }">${
        submit["mathwic" + i].includes("Wrong")
          ? submit["mathwic" + i].substring(
              0,
              submit["mathwic" + i].indexOf("->")
            )
          : submit["mathwic" + i]
      }</div>
                    </div>
                    </div>
                <div class="col-4">`;
    } else {
      html += `<div class="row border">
                        <div class="col-5 text-center border-right">${i}</div>
                        <div class="col-7 text-center ${
                          submit["mathwic" + i].includes("Wrong")
                            ? "bg-danger text-white"
                            : "bg-white"
                        }">${
        submit["mathwic" + i].includes("Wrong")
          ? submit["mathwic" + i].substring(
              0,
              submit["mathwic" + i].indexOf("->")
            )
          : submit["mathwic" + i]
      }</div>
                    </div>`;
    }
  }
  html += "</div></div></div>";

  return new handlebars.SafeString(html);
});

handlebars.registerHelper("testAnalysis", function(record) {
  let html =
    '<h1 class="text-center">Reading</h1><div class="row h4 text-dark text-center"><div class="col-3">';
  for (let i = 1; i <= 14; i++) {
    html += `${i}.&nbsp;<span class="text-dark">&nbsp;&nbsp;${
      record["reading" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 15; i <= 28; i++) {
    html += `${i}.<span class="text-dark mx-auto">&nbsp;&nbsp;${
      record["reading" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 29; i <= 42; i++) {
    html += `${i}.<span class="text-dark">&nbsp;&nbsp;${
      record["reading" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 43; i <= 52; i++) {
    html += `${i}.<span class="text-dark">&nbsp;&nbsp;${
      record["reading" + i]
    }</span><br>`;
  }
  html += "</div></div>";

  html +=
    '<h1 class="text-center">Writing</h1><div class="row h4 text-dark text-center"><div class="col-3">';
  for (let i = 1; i <= 11; i++) {
    html += `${i}.&nbsp;<span class="text-dark">&nbsp;&nbsp;${
      record["writing" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 12; i <= 22; i++) {
    html += `${i}.<span class="text-dark">&nbsp;&nbsp;${
      record["writing" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 23; i <= 33; i++) {
    html += `${i}.<span class="text-dark">&nbsp;&nbsp;${
      record["writing" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 34; i <= 44; i++) {
    html += `${i}.<span class="text-dark">&nbsp;&nbsp;${
      record["writing" + i]
    }</span><br>`;
  }
  html += "</div></div>";

  html +=
    '<h1 class="text-center">Math No Cal</h1><div class="row h4 text-dark text-center"><div class="col-3">';
  for (let i = 1; i <= 5; i++) {
    html += `${i}.&nbsp;<span class="text-dark">&nbsp;&nbsp;${
      record["mathnoc" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 6; i <= 10; i++) {
    html += `${i}.<span class="text-dark">&nbsp;&nbsp;${
      record["mathnoc" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 11; i <= 15; i++) {
    html += `${i}.<span class="text-dark">&nbsp;&nbsp;${
      record["mathnoc" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 16; i <= 20; i++) {
    html += `${i}.<span class="text-dark">&nbsp;&nbsp;${
      record["mathnoc" + i]
    }</span><br>`;
  }
  html += "</div></div>";

  html +=
    '<h1 class="text-center">Math With Cal</h1><div class="row h4 text-dark text-center"><div class="col-3">';
  for (let i = 1; i <= 10; i++) {
    html += `${i}.&nbsp;<span class="text-dark">&nbsp;&nbsp;${
      record["mathwic" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 11; i <= 20; i++) {
    html += `${i}.<span class="text-dark">&nbsp;&nbsp;${
      record["mathwic" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 21; i <= 30; i++) {
    html += `${i}.<span class="text-dark">&nbsp;&nbsp;${
      record["mathwic" + i]
    }</span><br>`;
  }
  html += '</div><div class="col-3">';
  for (let i = 31; i <= 38; i++) {
    html += `${i}.<span class="text-dark">&nbsp;&nbsp;${
      record["mathwic" + i]
    }</span><br>`;
  }
  html += "</div></div>";

  return new handlebars.SafeString(html);
});

module.exports = handlebars;

handlebars.registerHelper("satIIScores", submitDetail => {
  let submit = submitDetail.submit;
  let detail = submitDetail.detail;
  html = `<div class="row border border-dark rounded text-center lead"><div class="col-6 border-right border-dark"><div class="row border-bottom border-dark py-2" style="background:#EBF4FA"><div class="col-2 border-right border-dark">No</div><div class="col-2 border-right">Answer</div><div class="col-8 border-left">Q. Types</div></div>`;
  for (let i = 1; i <= 50; i++) {
    if (i == 26) {
      html += `</div><div class="col-6"><div class="row border-bottom border-dark py-2" style="background:#EBF4FA"><div class="col-2 border-right border-dark">No</div><div class="col-2 border-right">Answer</div><div class="col-8 border-left">Q. Types</div></div><div class="row border-bottom">
                        <div class="col-2 border-right border-info" style="background:${
                          submit["problem" + i].includes("Omit")
                            ? "#A9A9A9; color:white"
                            : submit["problem" + i].includes("Wrong")
                              ? "#d90000; color:white"
                              : ""
                        }">${i}</div>
                        <div class="col-2 border-right">${
                          submit["problem" + i].includes("->")
                            ? submit["problem" + i].substring(
                                0,
                                submit["problem" + i].indexOf("->")
                              )
                            : submit["problem" + i]
                        }</div>
                        <div class="col-8">${detail["problem" + i]}</div>
                    </div>`;
    } else {
      html += `<div class="row border-bottom">
                        <div class="col-2 border-right border-info" style="background:${
                          submit["problem" + i].includes("Omit")
                            ? "#A9A9A9; color:white"
                            : submit["problem" + i].includes("Wrong")
                              ? "#d90000; color:white"
                              : ""
                        }">${i}</div>
                        <div class="col-2 border-right">${
                          submit["problem" + i].includes("->")
                            ? submit["problem" + i].substring(
                                0,
                                submit["problem" + i].indexOf("->")
                              )
                            : submit["problem" + i]
                        }</div>
                        <div class="col-8">${detail["problem" + i]}</div>
                    </div>`;
    }
  }
  return new handlebars.SafeString(html + "</div></div>");
});

handlebars.registerHelper("satIIMath", student => {
  let html = `<h1 class="text-center">SAT II Math History</h1><div class="row">`;
  student.satII.forEach(satII => {
    html += `<div class="col-4 text-center">
                <a href="/satII/record/math/${student._id}/${
      satII.no
    }" style="text-decoration:none">${parseInt(satII.no) + 1}.${satII.test}</a>
               </div>`;
  });
  html += `</div>`;
  return new handlebars.SafeString(html);
});
