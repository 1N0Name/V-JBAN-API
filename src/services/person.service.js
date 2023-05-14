const {
    Person,
} = require('../models/connections.model');

class PersonService {
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
}

module.exports = new PersonService();