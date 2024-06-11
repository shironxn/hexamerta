import mailer from "nodemailer";

export const transporter = mailer.createTransport({
  service: "gmail",
  host: process.env.NEXT_PUBLIC_NODEMAILER_HOST,
  port: Number(process.env.NEXT_PUBLIC_NODEMAILER_PORT),
  secure: process.env.NEXT_PUBLIC_NODEMAILER_SECURE === "true" ? true : false,
  auth: {
    user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
    pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS,
  },
  logger: true,
});
