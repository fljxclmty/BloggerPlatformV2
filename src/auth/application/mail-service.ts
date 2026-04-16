import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// console.log("Проверка переменных:", process.env.SMTP_USER, process.env.SMTP_PASS ? "Пароль есть" : "Пароля нет");

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// const transporter: Transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// });

transporter.verify((error, success) => {
  if (error) {
    console.error("Ошибка при настройке почты❌", error);
  } else {
    console.log("✅ Сервер готов к отправке сообщений!");
  }
});

export const sendRegistrationMail = async (email: string, code: string) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Активация аккаунта на Blogger Platform",
      html: `<h1>Thank for your registration</h1>
 <p>To finish registration please follow the link below:
     <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>
 </p>`,
    });
  } catch (e) {
    console.error("❌Ошибка при отправке письма❌", e);
  }
};
