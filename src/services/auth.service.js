const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { accessToken, refreshToken } = require('../../config/auth.config');
const { Person, Token } = require('../models/connections.model');
const TokenHelper = require('../utils/token.helper');
const { sendConfirmationEmail } = require('../utils/email.helper');

class AuthService {
    async login(email, password) {
        const person = await Person.findOne({ where: { email } });
        if (!person) {
            throw new Error('Invalid email or password');
        }

        // Проверяем подтверждение почты
        if (person.confirmation_code !== null) {
            throw new Error('Email is not confirmed');
        }

        const isPasswordValid = await bcrypt.compare(password, person.pwd);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const accessTokenValue = TokenHelper.generateAccessToken(person, accessToken.salt, accessToken.expired);
        const refreshTokenValue = TokenHelper.generateRefreshToken(refreshToken.salt, refreshToken.expired);

        await Token.create({ person_id: person.id, token: refreshTokenValue });

        return { accessToken: accessTokenValue, refreshToken: refreshTokenValue };
    }

    async register(firstName, lastName, email, password, gender) {
        const existingPerson = await Person.findOne({ where: { email } });
        if (existingPerson) {
            throw new Error('Email is already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const confirmationCode = uuidv4();

        await Person.create({
            first_name: firstName,
            last_name: lastName,
            email,
            pwd: hashedPassword,
            gender,
            confirmation_code: confirmationCode
        });

        await sendConfirmationEmail(email, confirmationCode);
    }

    async claimAccount(email, confirmationToken) {
        const person = await Person.findOne({ where: { email, confirmation_code: confirmationToken } });
        if (!person) {
            throw new Error('Invalid confirmation token');
        }

        // Устанавливаем confirmation_code в null для подтверждения email
        person.confirmation_code = null;
        await person.save();
    }

    async refreshToken(refreshTokenValue) {
        const token = await Token.findOne({ where: { token: refreshTokenValue } });
        if (!token) {
            throw new Error('Invalid refresh token');
        }

        await Token.destroy({ where: { id: token.id } });

        const person = await Person.findByPk(token.person_id);
        if (!person) {
            throw new Error('Invalid refresh token');
        }

        const newAccessTokenValue = TokenHelper.generateAccessToken(person, accessToken.salt, accessToken.expired);
        const newRefreshTokenValue = TokenHelper.generateRefreshToken(refreshToken.salt, refreshToken.expired);

        await Token.create({ person_id: token.person_id, token: newRefreshTokenValue });

        return { accessToken: newAccessTokenValue, refreshToken: newRefreshTokenValue };
    }
}

module.exports = new AuthService();