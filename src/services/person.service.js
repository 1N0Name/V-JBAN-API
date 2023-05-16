const {
    Person,
    PersonProject,
    Role,
} = require('../models/connections.model');

class PersonService {
    async getAllPersonsByProject(projectId) {
        try {
            const persons = await PersonProject.findAll({
                where: { project_id: projectId },
                include: [
                    {
                        model: Person,
                        attributes: ['id', 'first_name', 'last_name'],
                    },
                    {
                        model: Role,
                        attributes: ['id', 'role_name']
                    }
                ],
                attributes: []
            });

            const formattedResponse = persons.map(person => {
                const { first_name, last_name } = person.person;
                const { id: role_id, role_name } = person.role;

                return {
                    id: person.person.id,
                    first_name,
                    last_name,
                    role_id,
                    role_name
                };
            });

            return { employees: formattedResponse };
        } catch(error) {
            console.log(error);
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
}

module.exports = new PersonService();