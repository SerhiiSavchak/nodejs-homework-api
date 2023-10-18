const nodemailer = require("nodemailer");

const { MAILER_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "intelekt200012@gmail.com",
    pass: MAILER_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "intelekt200012@gmail.com" };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
