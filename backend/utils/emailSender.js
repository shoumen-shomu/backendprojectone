const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

async function forgetPasswordEmail(email, token) {
  try {
    const info = await transporter.sendMail({
      from: "bshoumen@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<b>For Reseting Password <a href = "http://localhost:5173/resetpassword/${token}">Click Here</a></b>`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}
async function emailVerification(email, token) {
  try {
    const info = await transporter.sendMail({
      from: "bshoumen@gmail.com",
      to: email,
      subject: "Verify Your Email",
      html: `<b>Verify Your Email <a href = "http://localhost:5173/verify/${token}">Click Here</a></b>`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}

module.exports = { emailVerification,forgetPasswordEmail };
