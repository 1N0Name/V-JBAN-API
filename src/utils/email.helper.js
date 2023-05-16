const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendConfirmationEmail(email, confirmationCode) {
    // Читаем содержимое файла с шаблоном письма
    const templatePath = path.join(__dirname, '../../templates/confirmationEmailTemplate.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    // Заменяем placeholder {{confirmationLink}} на фактическую ссылку
    const confirmationLink = `https://sgu-dev.ru/api/claim-account?confirmation-token=${confirmationCode}&email=${encodeURIComponent(email)}`;
    const html = template.replace('{{confirmationLink}}', confirmationLink);

    // Создайте транспорт для отправки почты
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        auth: {
            user: process.env.CONFIRMATION_EMAIL,
            pass: process.env.CONFIRMATION_EMAIL_PWD,
        },
    });

    // Отправьте письмо
    await transporter.sendMail({
        from: process.env.CONFIRMATION_EMAIL,
        to: email,
        subject: 'Подтверждение аккаунта',
        html: html,
    });

    console.log(`Confirmation email to ${email} sent`);
}

module.exports = {
    sendConfirmationEmail,
};