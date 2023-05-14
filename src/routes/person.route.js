const express = require('express');
const PersonController = require('../controllers/person.controller');

const router = express.Router();

router.get('/', PersonController.getAllPersons);
router.get('/', PersonController.getPersonById);
router.post('/', PersonController.createPerson);
router.put('/', PersonController.updatePerson);
router.delete('/', PersonController.deletePerson);

module.exports = router;