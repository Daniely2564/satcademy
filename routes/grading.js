var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const Student = require("../models/Student");
const config = require("../Config/config");
const answers = require("../Config/answer");

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
    res.render("grading", {
      grading: "active"
    });
  })
  .post((req, res) => {
    var submit = req.body;

    console.log(submit.test);
    var answer = answers.cases(String(submit.test).toLowerCase());
    if (!answer) {
      res.render("grading", {
        errors: "No Such Test Was Found"
      });
      return;
    }
    var reading = "";
    var writing = "";
    var mathnoc = "";
    var mathwic = "";
    var readingw = 0;
    var writingw = 0;
    var mathnocw = 0;
    var mathwicw = 0;
    for (var i = 1; i <= 52; i++) {
      if (answer["reading" + i] != submit["reading" + i]) {
        reading += i + " ";
        readingw++;
        submit["reading" + i] += `->${
          answer["reading" + i]
        }<span class="text-danger bg-light float-right"> -Wrong</span>`;
      }
      if (i < 45) {
        if (answer["writing" + i] != submit["writing" + i]) {
          writing += i + " ";
          writingw++;
          submit["writing" + i] += `->${
            answer["writing" + i]
          }<span class="text-danger bg-light float-right"> -Wrong</span>`;
        }
      }
      if (i < 21) {
        if (!answer["mathnoc" + i].includes(",")) {
          if (answer["mathnoc" + i] != submit["mathnoc" + i]) {
            mathnoc += i + " ";
            mathnocw++;
            submit["mathnoc" + i] += `->${
              answer["mathnoc" + i]
            }<span class="text-danger bg-light float-right"> -Wrong</span>`;
          }
        } else {
          const array = answer["mathnoc" + i].split(",");
          if (!array.includes(submit["mathnoc" + i])) {
            mathnoc += i + " ";
            mathnocw++;
            submit["mathnoc" + i] += `->${
              answer["mathnoc" + i]
            }<span class="text-danger bg-light float-right"> -Wrong</span>`;
          }
        }
      }
      if (i < 39) {
        if (!answer["mathwic" + i].includes(",")) {
          if (answer["mathwic" + i] != submit["mathwic" + i]) {
            mathwic += i + " ";
            mathwicw++;
            submit["mathwic" + i] += `->${
              answer["mathwic" + i]
            }<span class="text-danger bg-light float-right"> -Wrong</span>`;
          }
        } else {
          const array = answer["mathwic" + i].split(",");
          if (!array.includes(submit["mathwic" + i])) {
            mathwic += i + " ";
            mathwicw++;
            submit["mathwic" + i] += `->${
              answer["mathwic" + i]
            }<span class="text-danger bg-light float-right"> -Wrong</span>`;
          }
        }
      }
    }
    var r = 52 - readingw;
    r = answer["readg" + r] + "";
    var w = 44 - writingw;
    w = answer["writeg" + w] + "";
    var m = 58 - (mathwicw + mathnocw);
    m = answer["mathg" + m] + "";

    res.render("result", {
      reading: reading,
      writing: writing,
      mathnoc: mathnoc,
      mathwic: mathwic,
      readingw: 52 - readingw,
      writingw: 44 - writingw,
      mathnocw: 20 - mathnocw,
      mathwicw: 38 - mathwicw,
      readingscore: r,
      writingscore: w,
      mathscore: m,
      english: new Number(r) + new Number(w),
      total: Number(r) + Number(w) + Number(m),
      student: req.body.stdname,
      submitted: submit
    });
  });

router
  .route("/student/:id")
  .get((req, res) => {
    Student.findById(req.params.id).then(student => {
      res.render("grading", {
        grading: "active",
        student: student
      });
    });
  })
  .post((req, res) => {
    Student.findById(req.params.id).then(student => {
      var submit = req.body;
      var studentName = student.name;
      console.log(submit.test);
      var answer = answers.cases(String(submit.test).toLowerCase());
      if (!answer) {
        res.render("grading", {
          message: "No Such Test Was Found"
        });
        return;
      }
      var reading = "";
      var writing = "";
      var mathnoc = "";
      var mathwic = "";
      var readingw = 0;
      var writingw = 0;
      var mathnocw = 0;
      var mathwicw = 0;
      for (var i = 1; i <= 52; i++) {
        if (answer["reading" + i] != submit["reading" + i]) {
          reading += i + " ";
          readingw++;
          submit["reading" + i] += `->${
            answer["reading" + i]
          }<span class="text-danger bg-light float-right"> -Wrong</span>`;
        }
        if (i < 45) {
          if (answer["writing" + i] != submit["writing" + i]) {
            writing += i + " ";
            writingw++;
            submit["writing" + i] += `->${
              answer["writing" + i]
            }<span class="text-danger bg-light float-right"> -Wrong</span>`;
          }
        }
        if (i < 21) {
          if (!answer["mathnoc" + i].includes(",")) {
            if (answer["mathnoc" + i] != submit["mathnoc" + i]) {
              mathnoc += i + " ";
              mathnocw++;
              submit["mathnoc" + i] += `->${
                answer["mathnoc" + i]
              }<span class="text-danger bg-light float-right"> -Wrong</span>`;
            }
          } else {
            const array = answer["mathnoc" + i].split(",");
            if (!array.includes(submit["mathnoc" + i])) {
              mathnoc += i + " ";
              mathnocw++;
              submit["mathnoc" + i] += `->${
                answer["mathnoc" + i]
              }<span class="text-danger bg-light float-right"> -Wrong</span>`;
            }
          }
        }
        if (i < 39) {
          if (!answer["mathwic" + i].includes(",")) {
            if (answer["mathwic" + i] != submit["mathwic" + i]) {
              mathwic += i + " ";
              mathwicw++;
              submit["mathwic" + i] += `->${
                answer["mathwic" + i]
              }<span class="text-danger bg-light float-right"> -Wrong</span>`;
            }
          } else {
            const array = answer["mathwic" + i].split(",");
            if (!array.includes(submit["mathwic" + i])) {
              mathwic += i + " ";
              mathwicw++;
              submit["mathwic" + i] += `->${
                answer["mathwic" + i]
              }<span class="text-danger bg-light float-right"> -Wrong</span>`;
            }
          }
        }
      }
      var r = 52 - readingw;
      r = answer["readg" + r] + "";
      var w = 44 - writingw;
      w = answer["writeg" + w] + "";
      var m = 58 - (mathwicw + mathnocw);
      m = answer["mathg" + m] + "";
      console.log("gradedBy", req.body.gradedBy);
      const test = answer["realName"];
      student.sat.push({
        no: student.sat.length,
        reading: r,
        writing: w,
        math: m,
        test: test,
        date: `${new Date().getFullYear()}-${new Date().getMonth() +
          1}-${new Date().getDate()}`,
        type: `${new Date().getDay() == 4 ? "F" : "H"}`,
        readingWrong: reading,
        writingWrong: writing,
        mathnocWrong: mathnoc,
        mathwicWrong: mathwic,
        english: new Number(r) + new Number(w),
        readingWrongN: readingw,
        writingWrongN: writingw,
        mathnocWrongN: mathnocw,
        mathwicWrongN: mathwicw,
        submit: req.body,
        gradedBy: req.body.gradedBy
      });

      student
        .save()
        .then(student => {
          console.log("Sat Score has been updated Successfully", student);
        })
        .catch(err => {
          console.log(err);
        });

      res.render("result", {
        reading: reading,
        writing: writing,
        mathnoc: mathnoc,
        mathwic: mathwic,
        readingw: 52 - readingw,
        writingw: 44 - writingw,
        mathnocw: 20 - mathnocw,
        mathwicw: 38 - mathwicw,
        rw: readingw,
        ww: writingw,
        nw: mathnocw,
        cw: mathwicw,
        readingscore: r,
        writingscore: w,
        english: new Number(r) + new Number(w),
        mathscore: m,
        total: Number(r) + Number(w) + Number(m),
        test: test,
        student: student,
        submitted: submit,
        gradedBy: req.body.gradedBy
      });
    });
  });

router.get("/record/:id/:no", (req, res) => {
  async function renderRecord() {
    try {
      let student = await Student.findById(req.params.id);
      let record = student.sat[req.params.no];
      res.render("grading/record", {
        english: parseInt(record.reading) + parseInt(record.writing),
        readingw: 52 - parseInt(record.readingWrongN),
        writingw: 44 - parseInt(record.writingWrongN),
        mathnocw: 20 - parseInt(record.mathnocWrongN),
        mathwicw: 38 - parseInt(record.mathwicWrongN),
        readingscore: record.reading,
        writingscore: record.writing,
        mathscore: record.math,
        test: record.test,
        record,
        student,
        total: `${new Number(record.reading) +
          new Number(record.writing) +
          new Number(record.math)}`,
        submitted: record.submit,
        gradedBy: record.gradedBy
      });
    } catch (err) {
      console.log(err);
    }
  }
  renderRecord();
});

router.get("/delete/:id/:no", (req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      const no = req.params.no;
      const sat = [];
      sat.push(student.sat[0]);
      let ii = 1;
      for (let i = 1; i < student.sat.length; i++) {
        if (i == no) continue;
        student.sat[i].no = ii;
        sat.push(student.sat[i]);
        ii++;
      }
      sat.sort((a, b) => {
        if (!a.no) {
          return -1;
        } else if (!b.no) {
          return 1;
        }
        if (new Number(a.no) > new Number(b.no)) {
          return 1;
        } else {
          return -1;
        }
      });
      student.sat = sat;
      student
        .save()
        .then(saved => {
          console.log("Has Been saved Successfully");
          res.redirect(`/student/${req.params.id}`);
        })
        .catch(err => {
          console.log(err, "Err at SAT Deletion;");
        });
    })
    .catch(err => {
      console.log(err, "Err at Finding a Student...");
    });
});

router.route("/student/:id/send").post((req, res) => {
  async function sendMail() {
    const student = await Student.findById(req.params.id);
    const total = req.body.total;
    const r = req.body.r;
    const w = req.body.w;
    const m = req.body.m;
    const mathnocw = req.body.mathnocw;
    const mathwicw = req.body.mathwicw;
    const readingw = req.body.readingw;
    const writingw = req.body.writingw;

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.mailer.id,
        pass: config.mailer.pass
      }
    });
    let html = ` <!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><!-- NAME:GIFT GIVING --><!--[if gte mso 15]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]--><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><title>*|MC:SUBJECT|*</title><style type="text/css">p{margin:10px 0;padding:0}table{border-collapse:collapse}h1,h2,h3,h4,h5,h6{display:block;margin:0;padding:0}img,a img{border:0;height:auto;outline:none;text-decoration:none}body,#bodyTable,#bodyCell{height:100%;margin:0;padding:0;width:100%}.mcnPreviewText{display:none!important}#outlook a{padding:0}img{-ms-interpolation-mode:bicubic}table{mso-table-lspace:0pt;mso-table-rspace:0pt}.ReadMsgBody{width:100%}.ExternalClass{width:100%}p,a,li,td,blockquote{mso-line-height-rule:exactly}a[href^=tel],a[href^=sms]{color:inherit;cursor:default;text-decoration:none}p,a,li,td,body,table,blockquote{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{line-height:100%}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}a.mcnButton{display:block}.mcnImage,.mcnRetinaImage{vertical-align:bottom}.mcnTextContent{word-break:break-word}.mcnTextContent img{height:auto!important}.mcnDividerBlock{table-layout:fixed!important}body,#bodyTable{background-color:#51CFDD}#bodyCell{border-top:0}#templateContainer{border:0}h1{color:#51CFDD!important;font-family:Helvetica;font-size:32px;font-style:normal;font-weight:400;line-height:125%;letter-spacing:normal;text-align:center}h2{color:#202020!important;font-family:Georgia;font-size:26px;font-style:normal;font-weight:400;line-height:125%;letter-spacing:1px;text-align:left}h3{color:#606060!important;font-family:Helvetica;font-size:18px;font-style:normal;font-weight:400;line-height:125%;letter-spacing:normal;text-align:center}h4{color:#808080!important;font-family:Helvetica;font-size:16px;font-style:normal;font-weight:400;line-height:125%;letter-spacing:normal;text-align:left}#templatePreheader{background-color:#51CFDD;border-top:0;border-bottom:0}.preheaderContainer .mcnTextContent,.preheaderContainer .mcnTextContent p{color:#FFF;font-family:Georgia;font-size:11px;line-height:125%;text-align:left}.preheaderContainer .mcnTextContent a{color:#FFF;font-weight:400;text-decoration:underline}#templateHeader{background-color:#FFF;border-top:0;border-bottom:0}.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{color:#606060;font-family:Georgia;font-size:14px;line-height:150%;text-align:center}.headerContainer .mcnTextContent a{color:#51CFDD;font-weight:400;text-decoration:underline}#templateBody{background-color:#FFF;border-top:0;border-bottom:0}.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{color:#606060;font-family:Georgia;font-size:15px;line-height:150%;text-align:left}.bodyContainer .mcnTextContent a{color:#51CFDD;font-weight:400;text-decoration:underline}#templateFooter{background-color:#FFF;border-top:0;border-bottom:0}.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{color:gray;font-family:Georgia;font-size:11px;line-height:125%;text-align:center}.footerContainer .mcnTextContent a{color:#51CFDD;font-weight:400;text-decoration:underline}@media only screen and (max-width:480px){body,table,td,p,a,li,blockquote{-webkit-text-size-adjust:none!important}}@media only screen and (max-width:480px){body{width:100%!important;min-width:100%!important}}@media only screen and (max-width:480px){#bodyCell{padding-top:10px!important}}@media only screen and (max-width:480px){#templateContainer,#templatePreheader,#templateHeader,#templateBody,#templateFooter{max-width:600px!important;width:100%!important}}@media only screen and (max-width:480px){.mcnRetinaImage{max-width:100%!important}}@media only screen and (max-width:480px){.mcnImage{height:auto!important;width:100%!important}}@media only screen and (max-width:480px){.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{max-width:100%!important;width:100%!important}}@media only screen and (max-width:480px){.mcnBoxedTextContentContainer{min-width:100%!important}}@media only screen and (max-width:480px){.mcnImageGroupContent{padding:9px!important}}@media only screen and (max-width:480px){.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{padding-top:9px!important}}@media only screen and (max-width:480px){.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{padding-top:18px!important}}@media only screen and (max-width:480px){.mcnImageCardBottomImageContent{padding-bottom:9px!important}}@media only screen and (max-width:480px){.mcnImageGroupBlockInner{padding-top:0!important;padding-bottom:0!important}}@media only screen and (max-width:480px){.mcnImageGroupBlockOuter{padding-top:9px!important;padding-bottom:9px!important}}@media only screen and (max-width:480px){.mcnTextContent,.mcnBoxedTextContentColumn{padding-right:18px!important;padding-left:18px!important}}@media only screen and (max-width:480px){.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{padding-right:18px!important;padding-bottom:0!important;padding-left:18px!important}}@media only screen and (max-width:480px){.mcpreview-image-uploader{display:none!important;width:100%!important}}@media only screen and (max-width:480px){h1{font-size:24px!important;line-height:125%!important}}@media only screen and (max-width:480px){h2{font-size:20px!important;line-height:125%!important}}@media only screen and (max-width:480px){h3{font-size:18px!important;line-height:125%!important}}@media only screen and (max-width:480px){h4{font-size:16px!important;line-height:125%!important}}@media only screen and (max-width:480px){.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{font-size:18px!important;line-height:125%!important}}@media only screen and (max-width:480px){#templatePreheader{display:block!important}}@media only screen and (max-width:480px){.preheaderContainer .mcnTextContent,.preheaderContainer .mcnTextContent p{font-size:14px!important;line-height:115%!important}}@media only screen and (max-width:480px){.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{font-size:18px!important;line-height:125%!important}}@media only screen and (max-width:480px){.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{font-size:18px!important;line-height:125%!important}}@media only screen and (max-width:480px){.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{font-size:14px!important;line-height:115%!important}}</style></head><body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="height: 100%;margin: 0;padding: 0;width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #51CFDD;"><!--*|IF:MC_PREVIEW_TEXT|*--><!--[if !gte mso 9]><!----><span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span><!--<![endif]--><!--*|END:IF|*--><center><table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;background-color: #51CFDD;"><tr><td align="center" valign="top" id="bodyCell" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;border-top: 0;"><!-- BEGIN TEMPLATE // --><table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border: 0;"><tr><td align="center" valign="top" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><!-- BEGIN PREHEADER // --><table border="0" cellpadding="0" cellspacing="0" width="600" id="templatePreheader" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #51CFDD;border-top: 0;border-bottom: 0;"><tr><td valign="top" class="preheaderContainer" style="padding-top: 9px;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><!--[if mso]><table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;"><tr><![endif]--><!--[if mso]><td valign="top" width="600" style="width:600px;"><![endif]--><table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #FFFFFF;font-family: Georgia;font-size: 11px;line-height: 125%;text-align: left;"></td></tr></tbody></table><!--[if mso]></td><![endif]--><!--[if mso]></tr></table><![endif]--></td></tr></tbody></table></td></tr></table><!-- // END PREHEADER --></td></tr><tr><td align="center" valign="top" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><!-- BEGIN HEADER // --><table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;border-top: 0;border-bottom: 0;"><tr><td valign="top" class="headerContainer" style="padding-top: 9px;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><!--[if gte mso 9]><table align="center" border="0" cellspacing="0" cellpadding="0" width="100%"><![endif]--><tbody class="mcnBoxedTextBlockOuter"><tr><td valign="top" class="mcnBoxedTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><!--[if gte mso 9]><td align="center" valign="top" ">
        <![endif]-->
        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;" class="mcnBoxedTextContentContainer">
            <tbody><tr>
                
                <td style="padding-top:9px;padding-left:18px;padding-bottom:9px;padding-right:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
                
                    <table border="0" cellspacing="0" class="mcnTextContentContainer" width="100%" style="min-width:100%!important;background-color:#404040;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
                        <tbody><tr>
                            <td valign="top" class="mcnTextContent" style="padding:18px;color:#F2F2F2;font-family:Helvetica;font-size:14px;font-weight:400;text-align:center;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;line-height:150%;">
                                
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
        </tbody></table>
        <!--[if gte mso 9]>
        </td>
        <![endif]-->
        
        <!--[if gte mso 9]>
        </tr>
        </table>
        <![endif]-->
    </td>
</tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
<tbody class="mcnImageBlockOuter">
    <tr>
        <td valign="top" style="padding:9px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;" class="mcnImageBlockInner">
            <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
                <tbody><tr>
                    <td class="mcnImageContent" valign="top" style="padding-right:9px;padding-left:9px;padding-top:0;padding-bottom:0;text-align:center;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
                        
                            
                                <img align="center" alt="" src="https://gallery.mailchimp.com/098e05bdff4fe18ae4fc7b19f/images/ed3ebb26-6633-4ef3-8683-156cb1413bf6.png" width="564" style="max-width:1027px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" class="mcnImage">
                            
                        
                    </td>
                </tr>
            </tbody></table>
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
<tbody class="mcnTextBlockOuter">
<tr>
    <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
          <!--[if mso]>
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
        <tr>
        <![endif]-->
        
        <!--[if mso]>
        <td valign="top" width="600" style="width:600px;">
        <![endif]-->
        <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%;min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;" width="100%" class="mcnTextContentContainer">
            <tbody><tr>
                
                <td valign="top" class="mcnTextContent" style="padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#606060;font-family:Georgia;font-size:14px;line-height:150%;text-align:center;">
                
                    <h1 style="display:block;margin:0;padding:0;font-family:Helvetica;font-size:32px;font-style:normal;font-weight:400;line-height:125%;letter-spacing:normal;text-align:center;color:#51CFDD!important;">Honors Review SAT Scores</h1>
<br>
${new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDay()}
<h2 style="display:block;margin:0;padding:0;font-family:Georgia;font-size:26px;font-style:normal;font-weight:400;line-height:125%;letter-spacing:1px;text-align:left;color:#202020!important;">Hello, this is Honors Review, Plainsboro. This is the SAT score ${
      student.name
    } has received.</h2>

                </td>
            </tr>
        </tbody></table>
        <!--[if mso]>
        </td>
        <![endif]-->
        
        <!--[if mso]>
        </tr>
        </table>
        <![endif]-->
    </td>
</tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;table-layout:fixed!important;">
<tbody class="mcnDividerBlockOuter">
<tr>
    <td class="mcnDividerBlockInner" style="min-width:100%;padding:18px 18px 9px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
        <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-top:3px double #DDD;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
            <tbody><tr>
                <td style="mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
                    <span></span>
                </td>
            </tr>
        </tbody></table>
<!--            
        <td class="mcnDividerBlockInner" style="padding:18px;">
        <hr class="mcnDividerContent" style="border-bottom-color:none;border-left-color:none;border-right-color:none;border-bottom-width:0;border-left-width:0;border-right-width:0;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;" />
-->
    </td>
</tr>
</tbody>
</table></td>
                                </tr>
                            </table>
                            <!-- // END HEADER -->
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
                            <!-- BEGIN BODY // -->
                            <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;background-color:#FFF;border-top:0;border-bottom:0;">
                                <tr>
                                    <td valign="top" class="bodyContainer" style="padding-top:9px;padding-bottom:9px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
<!--[if gte mso 9]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
<![endif]-->
<tbody class="mcnBoxedTextBlockOuter">
<tr>
    <td valign="top" class="mcnBoxedTextBlockInner" style="mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
        
        <!--[if gte mso 9]>
        <td align="center" valign="top" "><![endif]--><table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnBoxedTextContentContainer"><tbody><tr><td style="padding-top: 9px;padding-left: 18px;padding-bottom: 9px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><table border="0" cellspacing="0" class="mcnTextContentContainer" width="100%" style="min-width: 100% !important;background-color: #FDFDFD;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><tbody><tr><td valign="top" class="mcnTextContent" style="padding: 18px;color: #000000;font-family: Helvetica;font-size: 14px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"><style type="text/css">.row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}.display-1{font-size:6rem;font-weight:300;line-height:1.2}.display-2{font-size:5.5rem;font-weight:300;line-height:1.2}.display-3{font-size:4.5rem;font-weight:300;line-height:1.2}.display-4{font-size:3.5rem;font-weight:300;line-height:1.2}.col-1,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-10,.col-11,.col-12,.col,.col-auto,.col-sm-1,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm,.col-sm-auto,.col-md-1,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-12,.col-md,.col-md-auto,.col-lg-1,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg,.col-lg-auto,.col-xl-1,.col-xl-2,.col-xl-3,.col-xl-4,.col-xl-5,.col-xl-6,.col-xl-7,.col-xl-8,.col-xl-9,.col-xl-10,.col-xl-11,.col-xl-12,.col-xl,.col-xl-auto{position:relative;width:100%;min-height:1px;padding-right:15px;padding-left:15px}.col{-ms-flex-preferred-size:0;flex-basis:0%;-ms-flex-positive:1;flex-grow:1;max-width:100%}.col-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:none}.col-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:17.4%;margin-top:5px;margin-bottom:5px}.col-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:27.8%;margin-top:15px;margin-bottom:15px}.col-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:44.5%;margin-top:5px;margin-bottom:5px}.col-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.text-center{text-align:center!important}.rounded{border-radius:0.25rem!important}.border{border:1px solid #dee2e6!important}.border-top{border-top:1px solid #dee2e6!important}.border-right{border-right:1px solid #dee2e6!important}.border-bottom{border-bottom:1px solid #dee2e6!important}.border-left{border-left:1px solid #dee2e6!important}.border-0{border:0!important}.border-top-0{border-top:0!important}.border-right-0{border-right:0!important}.border-bottom-0{border-bottom:0!important}.border-left-0{border-left:0!important}.border-primary{border-color:#007bff!important}.border-secondary{border-color:#6c757d!important}.border-success{border-color:#28a745!important}.border-info{border-color:#17a2b8!important}.border-warning{border-color:#ffc107!important}.border-danger{border-color:#dc3545!important}.border-light{border-color:#f8f9fa!important}.border-dark{border-color:#343a40!important}.border-white{border-color:#fff!important}.text-center{text-align:center!important}</style><div class="row border border-info py-3 rounded" style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;border-radius: 0.25rem !important;border: 1px solid #dee2e6 !important;border-color: #17a2b8 !important;"><div class="col-6 border-right" style="margin: auto;position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 50%;flex: 0 0 50%;max-width: 44.5%;margin-top: 5px;margin-bottom: 5px;border-right: 1px solid #dee2e6 !important;"><h2 class="text-center text-dark" style="display: block;margin: 0;padding: 0;font-family: Georgia;font-size: 26px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: 1px;text-align: center !important;color: #202020 !important;">Total score</h2><hr><h1 class="display-3 text-center font-weight-bold" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 4.5rem;font-style: normal;font-weight: 300;line-height: 1.2;letter-spacing: normal;text-align: center !important;color: #51CFDD !important;">${total}</h1></div><div class="col-6 h-100" style="position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 50%;flex: 0 0 50%;max-width: 44.5%;margin-top: 5px;margin-bottom: 5px;">&nbsp;<div class="h-100"><div sytle="line-height:1.5;display:inline-block;vertical-align:middle"><div class="row" style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;"><div class="col-6" style="margin: auto;position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 50%;flex: 0 0 50%;max-width: 44.5%;margin-top: 5px;margin-bottom: 5px;"><h1 class="text-center text-dark" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 32px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center !important;color: #51CFDD !important;">English</h1></div><div class="col-6" style="margin: 5px auto;position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 50%;flex: 0 0 50%;max-width: 44.5%;margin-top: 5px;margin-bottom: 5px;"><h1 class="text-center" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 32px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center !important;color: #51CFDD !important;">${parseInt(
      r
    ) +
      parseInt(
        w
      )}</h1></div></div><hr><div class="row" style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;"><div class="col-6" style="margin: auto;position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 50%;flex: 0 0 50%;max-width: 44.5%;margin-top: 5px;margin-bottom: 5px;"><h1 class="text-center text-dark" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 32px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center !important;color: #51CFDD !important;">Math</h1></div><div class="col-6" style="margin: 5px auto;position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 50%;flex: 0 0 50%;max-width: 44.5%;margin-top: 5px;margin-bottom: 5px;"><h1 class="text-center" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 32px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center !important;color: #51CFDD !important;">${m}</h1></div></div></div></div></div></div>&nbsp;<div><h4 class="text-center text-success" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center !important;color: #808080 !important;">Sub Score</h4><div class="row border border-dark rounded" style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;border-radius: 0.25rem !important;border: 1px solid #dee2e6 !important;border-color: #343a40 !important;"><div class="col-4 border-right my-2" style="position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 33.333333%;flex: 0 0 33.333333%;max-width: 27.8%;margin-top: 15px;margin-bottom: 15px;border-right: 1px solid #dee2e6 !important;"><h4 class="text-center text-dark" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center !important;color: #808080 !important;">Reading</h4><hr><h1 class="text-center display-4" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 3.5rem;font-style: normal;font-weight: 300;line-height: 1.2;letter-spacing: normal;text-align: center !important;color: #51CFDD !important;">${r}</h1></div><div class="col-4 border-right my-2" style="position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 33.333333%;flex: 0 0 33.333333%;max-width: 27.8%;margin-top: 15px;margin-bottom: 15px;border-right: 1px solid #dee2e6 !important;"><h4 class="text-center text-dark" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center !important;color: #808080 !important;">Writing</h4><hr><h1 class="text-center display-4 text-danger" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 3.5rem;font-style: normal;font-weight: 300;line-height: 1.2;letter-spacing: normal;text-align: center !important;color: #51CFDD !important;">${w}</h1></div><div class="col-4 my-2" style="position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 33.333333%;flex: 0 0 33.333333%;max-width: 27.8%;margin-top: 15px;margin-bottom: 15px;"><h4 class="text-center text-dark" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center !important;color: #808080 !important;">Math</h4><hr><h1 class="text-center display-4" style="color: #9ACD32;display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 3.5rem;font-style: normal;font-weight: 300;line-height: 1.2;letter-spacing: normal;text-align: center !important;">${m}</h1></div></div></div><div class="row border border-dark rounded mt-2" style="margin-top: 30px;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;border-radius: 0.25rem !important;border: 1px solid #dee2e6 !important;border-color: #343a40 !important;"><div class="col-3 border-right my-2" style="position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 25%;flex: 0 0 25%;max-width: 19.4%;border-right: 1px solid #dee2e6 !important;"><p class="text-center font-weight-bold" style="font-size: 14px;color: #000000;font-family: Helvetica;font-weight: normal;text-align: center;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 150%;">Reading</p><h1 class="text-center" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 32px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center !important;color: #51CFDD !important;">${52 -
      parseInt(
        readingw
      )}/<span class="font-weight-bold text-dark" style="font-size:40%">52</span></h1></div><div class="col-3 border-right my-2" style="position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 25%;flex: 0 0 25%;max-width: 19.4%;border-right: 1px solid #dee2e6 !important;"><p class="text-center font-weight-bold" style="font-size: 14px;color: #000000;font-family: Helvetica;font-weight: normal;text-align: center;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 150%;">Writing</p><h1 class="text-center text-danger" style="display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 32px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center !important;color: #51CFDD !important;">${44 -
      parseInt(
        writingw
      )}/<span class="font-weight-bold text-dark" style="font-size:40%">44</span></h1></div><div class="col-3 border-right my-2" style="position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 25%;flex: 0 0 25%;max-width: 19.4%;border-right: 1px solid #dee2e6 !important;"><p class="text-center font-weight-bold" style="font-size: 14px;color: #000000;font-family: Helvetica;font-weight: normal;text-align: center;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 150%;">Math w/o Cal</p><h1 class="text-center" style="color: #CCCC00;display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 32px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center !important;">${20 -
      parseInt(
        mathnocw
      )}/<span class="font-weight-bold text-dark" style="font-size:40%">20</span></h1></div><div class="col-3 my-2" style="position: relative;width: 100%;min-height: 1px;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 25%;flex: 0 0 25%;max-width: 19.4%;"><p class="text-center font-weight-bold" style="font-size: 14px;color: #000000;font-family: Helvetica;font-weight: normal;text-align: center;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 150%;">Math w Cal</p><h1 class="text-center" style="color: #9ACD32;display: block;margin: 0;padding: 0;font-family: Helvetica;font-size: 32px;font-style: normal;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center !important;">${38 -
      parseInt(
        mathwicw
      )}/<span class="font-weight-bold text-dark" style="font-size:40%">38</span></h1></div></div></td></tr></tbody></table></td></tr></tbody></table><!--[if gte mso 9]></td><![endif]--><!--[if gte mso 9]></tr></table><![endif]--></td></tr></tbody></table></td></tr></table><!-- // END BODY --></td></tr><tr><td align="center" valign="top" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><!-- BEGIN FOOTER // --><table border="0" cellpadding="0" cellspacing="0" width="600" id="templateFooter" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;border-top: 0;border-bottom: 0;"><tr><td valign="top" class="footerContainer" style="padding-top: 9px;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><tbody class="mcnImageBlockOuter"><tr><td valign="top" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner"><table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><tbody><tr><td class="mcnImageContent" valign="top" style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img align="center" alt="" src="https://gallery.mailchimp.com/0d61bb2ec9002f0e9872b8c36/images/holiday_snowmen_snowflake.png" width="52" style="max-width: 52px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnImage"></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><!--[if mso]><table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;"><tr><![endif]--><!--[if mso]><td valign="top" width="600" style="width:600px;"><![endif]--><table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #808080;font-family: Georgia;font-size: 11px;line-height: 125%;text-align: center;"><em>Copyright © 2018 Honors Review,All rights reserved.</em><br><br><strong>Our mailing address is:</strong><br>honorsreviewplainsboro5@gmail.com </td></tr></tbody></table><!--[if mso]></td><![endif]--><!--[if mso]></tr></table><![endif]--></td></tr></tbody></table></td></tr></table><!-- // END FOOTER --></td></tr><tr><td align="center" valign="top" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img src="https://gallery.mailchimp.com/27aac8a65e64c994c4416d6b8/images/couponshadow.png" height="20" width="600" class="mcnImage" style="display: block;max-width: 560px;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;vertical-align: bottom;"></td></tr></table><!-- // END TEMPLATE --></td></tr></table></center></body></html>`;
    let mailOptions = {
      from: `SATCADEMY <${config.mailer.id}>`,
      to: `${student.parentEmail},${student.email}`,
      subject: `${student.name}'s SAT Grade, Today`,
      text: `This is from SATCADEMY and this is the result from SAT your child took.`,
      html: html
    };

    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }

  sendMail();
  req.flash("message", "Score was sent successfully");
  res.redirect("/search");
});

router
  .route("/editsat/:id/:no")
  .get((req, res) => {
    Student.findById(req.params.id).then(student => {
      let currentSAT = student.sat[req.params.no];
      res.render("sat/edit", {
        submit: currentSAT.submit,
        student
      });
    });
  })
  .post((req, res) => {
    Student.findById(req.params.id)
      .then(student => {
        var submit = req.body;
        var answer = answers.cases(String(submit.test).toLowerCase());
        var reading = "";
        var writing = "";
        var mathnoc = "";
        var mathwic = "";
        var readingw = 0;
        var writingw = 0;
        var mathnocw = 0;
        var mathwicw = 0;
        async function dothis() {
          for (var i = 1; i <= 52; i++) {
            if (answer["reading" + i] != submit["reading" + i]) {
              reading += i + " ";
              readingw++;
              submit["reading" + i] += `->${
                answer["reading" + i]
              }<span class="text-danger bg-light float-right"> -Wrong</span>`;
            }
            if (i < 45) {
              if (answer["writing" + i] != submit["writing" + i]) {
                writing += i + " ";
                writingw++;
                submit["writing" + i] += `->${
                  answer["writing" + i]
                }<span class="text-danger bg-light float-right"> -Wrong</span>`;
              }
            }
            if (i < 21) {
              if (!answer["mathnoc" + i].includes(",")) {
                if (answer["mathnoc" + i] != submit["mathnoc" + i]) {
                  mathnoc += i + " ";
                  mathnocw++;
                  submit["mathnoc" + i] += `->${
                    answer["mathnoc" + i]
                  }<span class="text-danger bg-light float-right"> -Wrong</span>`;
                }
              } else {
                const array = answer["mathnoc" + i].split(",");
                if (!array.includes(submit["mathnoc" + i])) {
                  mathnoc += i + " ";
                  mathnocw++;
                  submit["mathnoc" + i] += `->${
                    answer["mathnoc" + i]
                  }<span class="text-danger bg-light float-right"> -Wrong</span>`;
                }
              }
            }
            if (i < 39) {
              if (!answer["mathwic" + i].includes(",")) {
                if (answer["mathwic" + i] != submit["mathwic" + i]) {
                  mathwic += i + " ";
                  mathwicw++;
                  submit["mathwic" + i] += `->${
                    answer["mathwic" + i]
                  }<span class="text-danger bg-light float-right"> -Wrong</span>`;
                }
              } else {
                const array = answer["mathwic" + i].split(",");
                if (!array.includes(submit["mathwic" + i])) {
                  mathwic += i + " ";
                  mathwicw++;
                  submit["mathwic" + i] += `->${
                    answer["mathwic" + i]
                  }<span class="text-danger bg-light float-right"> -Wrong</span>`;
                }
              }
            }
          }
          var r = 52 - readingw;
          r = answer["readg" + r] + "";
          var w = 44 - writingw;
          w = answer["writeg" + w] + "";
          var m = 58 - (mathwicw + mathnocw);
          m = answer["mathg" + m] + "";
          const test = answer["realName"];

          student.sat.push({
            no: new Number(req.params.no),
            reading: r,
            writing: w,
            math: m,
            test: test,
            date: `${new Date().getFullYear()}-${new Date().getMonth() +
              1}-${new Date().getDate()}`,
            type: `${new Date().getDay() == 1 ? "F" : "H"}`,
            readingWrong: reading,
            writingWrong: writing,
            mathnocWrong: mathnoc,
            mathwicWrong: mathwic,
            readingWrongN: readingw,
            writingWrongN: writingw,
            mathnocWrongN: mathnocw,
            mathwicWrongN: mathwicw,
            submit: submit,
            gradedBy: req.body.gradedBy
          });

          student.save().then(st => {
            res.redirect(`/grading/delete/${st._id}/${req.params.no}`);
          });
        }

        dothis();
      })
      .catch(err => {
        console.log(err);
        console.log("Err at Grading 2413");
      });
  });

module.exports = router;
