const PersonService = require('../services/person.service');

class PersonController {
    async getAllPersonsByProject(req, res, next) {
        try {
            const projectId = req.params.id;
            const persons = await PersonService.getAllPersonsByProject(projectId);
            res.json(persons);
        } catch (error) {
            next(error);
        }
    }

    async getAllPersons(req, res, next) {
        try {
            const persons = await PersonService.getAllPersons();
            res.json(persons);
        } catch (error) {
            next(error);
        }
    }

    async getPersonById(req, res, next) {
        try {
            const userId = req.user.id;
            const person = await PersonService.getPersonById(userId);
            res.json(person);
        } catch (error) {
            next(error);
        }
    }

    async createPerson(req, res, next) {
        const { firstName, lastName, email, pwd, gender } = req.body;
        try {
            const person = await PersonService.createPerson(firstName, lastName, email, pwd, gender);
            res.status(201).json(person);
        } catch (error) {
            next(error);
        }
    }

    async updatePerson(req, res, next) {
        const { firstName, lastName, email, pwd, gender } = req.body;
        try {
            const userId = req.user.id;
            const person = await PersonService.updatePerson(userId, firstName, lastName, email, pwd, gender);
            res.json(person);
        } catch (error) {
            next(error);
        }
    }

    async deletePerson(req, res, next) {
        try {
            const userId = req.user.id;
            await PersonService.deletePerson(userId);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PersonController();