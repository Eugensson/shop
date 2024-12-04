import nodemailer from "nodemailer";

const pass = process.env.NODEMAILER_SENDER_PASSWORD;
const email = process.env.NODEMAILER_SENDER_EMAIL;
const recipient = process.env.NODEMAILER_RECIPIENT_EMAIL;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: email, pass },
});

export const mailOptions = {
  from: email,
  to: recipient,
};
