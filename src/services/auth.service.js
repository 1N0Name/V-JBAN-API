const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { accessToken, refreshToken, inviteToken } = require('../../config/auth.config');
const {
    Person,
    Token,
    Invite,
    PersonRole,
} = require('../models/connections.model');
const TokenHelper = require('../utils/token.helper');
const { InformationEmail } = require('../utils/email.helper');
const {
    EmailNotConfirmedError,
    InvalidCredentialsError,
    EmailAlreadyRegisteredError,
    InvalidRegistrationCodeError,
    InvalidRefreshTokenError,
    UserNotFound,
    InvalidTokenError,
} = require('../utils/error.helper');

class AuthService {
    async getLoginPage() {
        return {
            host: process.env.SERVER_HOST,
        }
    }

    async login(email, password) {
        const person = await Person.findOne({ where: { email } });
        if (!person) {
            throw new InvalidCredentialsError();
        }

        // Проверяем подтверждение почты
        if (person.confirmation_code !== null) {
            throw new EmailNotConfirmedError();
        }

        const isPasswordValid = await bcrypt.compare(password, person.pwd);
        if (!isPasswordValid) {
            throw new InvalidCredentialsError();
        }

        const accessTokenValue = TokenHelper.generateAccessToken(person, accessToken.salt, accessToken.expired);
        const refreshTokenValue = TokenHelper.generateRefreshToken(refreshToken.salt, refreshToken.expired);

        await Token.create({ person_id: person.id, token: refreshTokenValue });

        return { accessToken: accessTokenValue, refreshToken: refreshTokenValue };
    }

    async addUserToProject(email, token) {
        const person = await Person.findOne({ where: { email } });
        if (!person) {
            throw new UserNotFoundError();
        }

        const invite = await Invite.findOne({ where: { token } });
        if (!invite) {
            throw new Error("Invite link not found.");
        }

        try {
            const decodedJwt = jwt.verify(token, inviteToken.salt);
            const { roleId } = decodedJwt;
            if (roleId) {
                await PersonRole.create({ person_id: person.id, role_id: roleId });
            }
        } catch (err) {
            throw new InvalidTokenError();
        }

        await invite.destroy();

        return { status_msg: "Вы были успешно добавлены в проект!" };
    }

    async getRegisterPage(queryString) {
        return {
            host: process.env.SERVER_HOST,
        }
    }

    async register(firstName, lastName, email, password, gender) {
        const existingPerson = await Person.findOne({ where: { email } });
        if (existingPerson) {
            throw new EmailAlreadyRegisteredError();
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

        const informationEmail = new InformationEmail();
        informationEmail.send(
            email,
            'Подтверждение аккаунта',
            {
                mainText: 'Благодарим Вас за регистрацию аккаунта в V-JBAN. Чтобы завершить процесс регистрации, пожалуйста, нажмите на кнопку ниже для подтверждения Вашего адреса электронной почты.',
                btnText: 'Подтвердить электронную почту',
                targetLink: `${process.env.SERVER_HOST}/api/claim-account?confirmation-token=${confirmationCode}&email=${encodeURIComponent(email)}`,
                secondaryText: 'Если Вы не регистрировались в нашем приложении, просто проигнорируйте это письмо.',
            }
        );
    }

    async claimAccount(email, confirmationToken) {
        const person = await Person.findOne({ where: { email, confirmation_code: confirmationToken } });
        if (!person) {
            throw new InvalidRegistrationCodeError();
        }

        // Устанавливаем confirmation_code в null для подтверждения email
        person.confirmation_code = null;
        await person.save();

        // Формируем отчет для пользователя
        return {
            host: process.env.SERVER_HOST,
            title: 'V-JBAN - Регистрация завершена',
            infoText: 'Ваш аккаунт успешно подтвержден'
        };
    }

    async refreshToken(refreshTokenValue) {
        const token = await Token.findOne({ where: { token: refreshTokenValue } });
        if (!token) {
            throw new InvalidRefreshTokenError();
        }

        await Token.destroy({ where: { id: token.id } });

        const person = await Person.findByPk(token.person_id);
        if (!person) {
            throw new UserNotFound();
        }

        const newAccessTokenValue = TokenHelper.generateAccessToken(person, accessToken.salt, accessToken.expired);
        const newRefreshTokenValue = TokenHelper.generateRefreshToken(refreshToken.salt, refreshToken.expired);

        await Token.create({ person_id: token.person_id, token: newRefreshTokenValue });

        return { accessToken: newAccessTokenValue, refreshToken: newRefreshTokenValue };
    }
}

module.exports = new AuthService();