const fs = require('fs');
const path = require('path');
const AuthService = require('../services/auth.service');

class AuthController {
    returnTestPage(req, res, next) {
        try {
            const htmlPath = path.join(__dirname, '../../templates/successRegistrationTemplate.html');
            const htmlTemplate = fs.readFileSync(htmlPath, 'utf-8');

            const imagePath = path.join(__dirname, '../../assets/images/logo.png');
            const imageBuffer = fs.readFileSync(imagePath);
            const base64Image = imageBuffer.toString('base64');
            const cid = 'logo';

            const modifiedHtmlTemplate = htmlTemplate.replace('src="cid:logo"', `src="data:image/jpeg;base64,${base64Image}" cid="${cid}"`);

            res.setHeader('Content-Type', 'text/html');
            res.send(modifiedHtmlTemplate);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        try {
            const tokens = await AuthService.login(email, password);
            res.json(tokens);
        } catch (error) {
            next(error);
        }
    }

    async register(req, res, next) {
        const { firstName, lastName, email, password, gender } = req.body;
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
            const htmlTemplate = await AuthService.claimAccount(email, confirmationToken);

            res.setHeader('Content-Type', 'text/html');
            res.send(htmlTemplate);
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