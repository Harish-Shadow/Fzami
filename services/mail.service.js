const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const { MAIL_BOT_ID, MAIL_BOT_PASSWORD, ADMIN_MAIL_ID, COMPANY_INFO } = require("../auth/credentials");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_BOT_ID,
    pass: MAIL_BOT_PASSWORD,
  },
});

const POST_MAN = async (toEmails, subject, htmlFile) => {
  const mailOptions = {
    from: MAIL_BOT_ID,
    to: 'themanikandan.trs@gmail.com',
    subject: `${subject}`,
    html: htmlFile,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return { status: 200, msg: "Email Sent" };
  } catch (err) {
    console.log("MAIL ERROR: ", err.message);
    return { status: 500, error: err.message };
  }
};

const sendEnquiry = async (data) => {
  try {
    const htmlFile = await ejs.renderFile(
      path.join(__dirname,"mail", "enquiry.mail.ejs"),
      { data, company: COMPANY_INFO }
    );
    const emails = [ADMIN_MAIL_ID];
    return await POST_MAN(emails, `NEW ENQUIRY FROM - ${data?.name}`, htmlFile);
  } catch (err) {
    console.log("MAIL ERROR: ", err.message);
    return { status: 500, error: err.message };
  }
};

module.exports = {
  sendEnquiry,
};
