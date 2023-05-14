const path = require('path');
const AuthService = require('../services/auth.service');

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const tokens = await AuthService.login(email, password);
            res.json(tokens);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    async register(req, res) {
        const { firstName, lastName, email, password, gender } = req.body;
        try {
            await AuthService.register(firstName, lastName, email, password, gender);
            res.sendStatus(201);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async claimAccount(req, res) {
        const { confirmation_token, email } = req.query;

        try {
            await claimAccount(email, confirmation_token);
            res.sendFile(path.join(__dirname, '../../templates/success.html'));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async refreshToken(req, res) {
        const refreshToken = req.body.refreshToken;
        try {
            const tokens = await AuthService.refreshToken(refreshToken);
            res.json(tokens);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();