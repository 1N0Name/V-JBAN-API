const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const {
    Person,
    PersonRole,
    Role,
} = require('../models/connections.model');
const { InformationEmail } = require('../utils/email.helper');
const {
    InvalidResetTokenError,
    UserNotFound,
} = require('../utils/error.helper');

class PersonService {
    async getAllPersonsByProject(projectId) {
        try {
            const usersWithRoles = await PersonRole.findAll({
                include: [
                    { model: Person },
                    { model: Role, where: { project_id: projectId } }
                ]
            });

            const usersWithRolesFormatted = usersWithRoles.reduce((result, { person, role }) => {
                const { id, first_name, last_name } = person;
                const { id: role_id, role_name } = role;

                const existingUser = result.find(user => user.id === id);

                if (existingUser) {
                    existingUser.roles.push({ role_id, role_name });
                } else {
                    result.push({ id, first_name, last_name, roles: [{ role_id, role_name }] });
                }

                return result;
            }, []);

            return usersWithRolesFormatted;
        } catch(error) {
            throw new Error('Failed to fetch all users');
        }
    }

    async getAllPersons() {
        try {
            const persons = await Person.findAll();
            return persons;
        } catch (error) {
            throw new Error('Failed to fetch persons');
        }
    }

    async getPersonById(id) {
        try {
            const person = await Person.findByPk(id);
            if (!person) {
                throw new Error('Person not found');
            }
            return person;
        } catch (error) {
            throw new Error('Failed to fetch person');
        }
    }

    async createPerson(firstName, lastName, email, pwd, gender) {
        try {
            const person = await Person.create({ firstName, lastName, email, pwd, gender });
            return person;
        } catch (error) {
            throw new Error('Failed to create person');
        }
    }

    async updatePerson(id, firstName, lastName, email, pwd, gender) {
        try {
            const person = await Person.findByPk(id);
            if (!person) {
                throw new Error('Person not found');
            }
            await person.update({ firstName, lastName, email, pwd, gender });
            return person;
        } catch (error) {
            throw new Error('Failed to update person');
        }
    }

    async deletePerson(id) {
        try {
            const person = await Person.findByPk(id);
            if (!person) {
                throw new Error('Person not found');
            }
            await person.destroy();
        } catch (error) {
            throw new Error('Failed to delete person');
        }
    }

    async getPasswordResetPage() {
        return {
            host: process.env.SERVER_HOST
        };
    }

    async sendPasswordResetConfirmation(email) {
        const person = await Person.findOne({ where: { email } });
        if (!person) {
            throw new UserNotFound();
        }

        const resetToken = uuidv4();
        person.reset_token = resetToken;
        await person.save();

        const informationEmail = new InformationEmail();
        informationEmail.send(
            email,
            'Сброс пароля',
            {
                mainText: 'Здравствуйте. С вашего аккаунта поступил запрос на восстановление пароля. Для того, чтобы его сменить, нажмите на кнопку ниже:',
                btnText: 'Сменить пароль',
                targetLink: `${process.env.SERVER_HOST}/api/user/reset-password?confirmation-token=${resetToken}&email=${encodeURIComponent(email)}`,
                secondaryText: '<p>Если Вы не совершали этого действия, просто проигнорируйте это письмо.</p>',
            }
        );
    }

    async createNewPasswordTemplate(resetToken, email) {
        const person = await Person.findOne({ where: { email, reset_token: resetToken } });
        if (!person) {
            throw new UserNotFound();
        }

        return {
            host: process.env.SERVER_HOST
        };
    }

    async changePassword(resetToken, newPassword, email) {
        const person = await Person.findOne({ where: { email, reset_token: resetToken } });
        if (!person) {
            throw new InvalidResetTokenError();
        }

        person.pwd = await bcrypt.hash(newPassword, 10);
        person.reset_token = null;
        await person.save();

        return {
            host: process.env.SERVER_HOST,
            title: 'V-JBAN - Пароль изменен',
            infoText: 'Ваш пароль успешно изменен'
        };
    }
}

module.exports = new PersonService();