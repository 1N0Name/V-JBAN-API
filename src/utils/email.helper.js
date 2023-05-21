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
        attachments: [
            {
                filename: 'logo.png',
                path: path.join(__dirname, '../../assets/images/logo.png'),
                cid: 'logo'
            },
            {
                filename: 'mouse_click.png',
                path: path.join(__dirname, '../../assets/images/mouse_click.png'),
                cid: 'click'
            }
        ]
    });

    console.log(`Письмо с подветрждением почты отправлено: ${email}`);
}

async function sendResetPasswordEmail(email, resetLink) {
    // Читаем содержимое файла с шаблоном письма
    const templatePath = path.join(__dirname, '../../templates/changePasswordEmailTemplate.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    // Заменяем placeholder {{confirmationLink}} на фактическую ссылку
    const html = template.replace('{{confirmationLink}}', resetLink);

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
        subject: 'Подтверждение сброса почты',
        html: html,
        attachments: [
            {
                filename: 'logo.png',
                path: path.join(__dirname, '../../assets/images/logo.png'),
                cid: 'logo'
            },
            {
                filename: 'mouse_click.png',
                path: path.join(__dirname, '../../assets/images/mouse_click.png'),
                cid: 'click'
            }
        ]
    });

    console.log(`Увдомление с подтверждением сброса пароля отправлено на ${email}`);
}

async function replaceImageWithBase64(htmlTemplate, imagePath, imageTag) {
    const imageBuffer = await fs.promises.readFile(imagePath);
    const base64Image = imageBuffer.toString('base64');
    return htmlTemplate.replace(`src="cid:${imageTag}"`, `src="data:image/jpeg;base64,${base64Image}"`);
}

module.exports = {
    sendConfirmationEmail,
    sendResetPasswordEmail,
    replaceImageWithBase64,
};