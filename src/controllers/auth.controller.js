const ejs = require('ejs');
const path = require('path');
const AuthService = require('../services/auth.service');

require('dotenv').config();

class AuthController {
    async returnTestPage(req, res, next) {
        try {
            const data = {
                host: process.env.SERVER_HOST
            };

            const templatePath = path.join(__dirname, '../../templates', 'registerTemplate.ejs');
            try {
                const str = await ejs.renderFile(templatePath, data);
                res.send(str);
            } catch (err) {
                console.error('Ошибка при рендеринге шаблона:', err);
            }

        } catch (error) {
            next(error);
        }
    }

    async getLoginPage(req, res, next) {
        try {
            const data = await AuthService.getLoginPage();

            const str = await ejs.renderFile(path.join(__dirname, '../../templates', 'loginTemplate.ejs'), data);
            res.send(str);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const { token } = req.query;

        try {
            if (token) {
                // Если токен существует, добавляем пользователя в проект
                await AuthService.addUserToProject(email, token);
                res.json('Вы были успешно добавлены в проект!');
            } else {
                // Иначе, авторизуем пользователя
                const tokens = await AuthService.login(email, password);
                res.json(tokens);
            }
        } catch (error) {
            next(error);
        }
    }

    async getRegisterPage(req, res, next) {
        try {
            const queryString = req.originalUrl.split('?')[1];
            const data = await AuthService.getRegisterPage(queryString);

            const str = await ejs.renderFile(path.join(__dirname, '../../templates', 'registerTemplate.ejs'), data);
            res.send(str);
        } catch (error) {
            next(error);
        }
    }

    async register(req, res, next) {
        const { firstName, lastName, email, password, gender } = req.body;
        console.log(req.body);
        console.log(firstName, lastName, email, password, gender)
        try {
            await AuthService.register(firstName, lastName, email, password, gender);
            res.sendStatus(201);
        } catch (error) {
            next(error);
        }
    }

    async claimAccount(req, res, next) {
        const { "confirmation-token": confirmationToken, email } = req.query;

        try {
            const data = await AuthService.claimAccount(email, confirmationToken);

            const str = await ejs.renderFile(path.join(__dirname, '../../templates', 'actionSuccessTemplate.ejs'), data);
            res.send(str);
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req, res, next) {
        const refreshToken = req.body.refreshToken;
        try {
            const tokens = await AuthService.refreshToken(refreshToken);
            res.json(tokens);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();