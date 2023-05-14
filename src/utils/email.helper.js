const fs = require('fs');
const nodemailer = require('nodemailer');

async function sendConfirmationEmail(email, confirmationCode) {
    // Читаем содержимое файла с шаблоном письма
    const template = fs.readFileSync('../../templates/confirmationEmailTemplate.html', 'utf-8');

    // Заменяем placeholder {{confirmationLink}} на фактическую ссылку
    const confirmationLink = `/person/claim-account?confirmation-token=${confirmationCode}&email=${encodeURIComponent(email)}`;
    const html = template.replace('{{confirmationLink}}', confirmationLink);

    // Создайте транспорт для отправки почты
    const transporter = nodemailer.createTransport({
        service: 'your-email-service-provider', // Например, 'gmail'
        auth: {
            user: 'your-email@example.com',
            pass: 'your-email-password',
        },
    });

    // Отправьте письмо
    await transporter.sendMail({
        from: 'your-email@example.com',
        to: email,
        subject: 'Подтверждение аккаунта',
        html: html,
    });

    console.log(`Confirmation email to ${email} sent`);
}