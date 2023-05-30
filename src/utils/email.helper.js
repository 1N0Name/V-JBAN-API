const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

require('dotenv').config();

class EmailSender {
    constructor(from, templatePath, attachments) {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.zoho.eu',
            port: 465,
            secure: true,
            auth: {
                user: process.env.CONFIRMATION_EMAIL,
                pass: process.env.CONFIRMATION_EMAIL_PWD,
            },
        });
        this.from = from;
        this.attachments = attachments;
        this.templatePath = templatePath;
    }

    async send(to, subject, placeholders) {
        try {
            // Читаем содержимое файла с шаблоном письма
            const template = fs.readFileSync(this.templatePath, 'utf-8');

            // Заменяем placeholder'ы на фактические значения
            let html = template;
            for (const [key, value] of Object.entries(placeholders)) {
                html = html.replace(`{{${key}}}`, value);
            }

            // Отправьте письмо
            await this.transporter.sendMail({
                from: this.from,
                to,
                subject,
                html,
                attachments: this.attachments
            });

            console.log(`Письмо успешно отправлено: ${to}`);
        } catch (error) {
            console.error(`Ошибка при отправке письма: ${error}`);
        }
    }
}

class InformationEmail extends EmailSender {
    constructor() {
        super(
            process.env.CONFIRMATION_EMAIL,
            path.join(__dirname, '../../templates/emailNotificationTemplate.html'),
            [
                {
                    filename: 'logo.png',
                    path: path.join(__dirname, '../../public/assets/images/logo.png'),
                    cid: 'logo'
                },
                {
                    filename: 'mouse_click.png',
                    path: path.join(__dirname, '../../public/assets/images/mouse_click.png'),
                    cid: 'click'
                }
            ]
        );
    }
}

module.exports = {
    InformationEmail,
};