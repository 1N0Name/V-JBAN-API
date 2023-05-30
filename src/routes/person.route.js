const express = require('express');
const { authenticateToken } = require('../middleware/auth.middleware');
const { AccessController } = require('../middleware/access_controller.middleware');
const PersonController = require('../controllers/person.controller');

const router = express.Router();

router.get('/forgot-password', PersonController.getPasswordResetPage);
router.post('/forgot-password', PersonController.sendPasswordResetConfirmation);
router.get('/reset-password', PersonController.createNewPassword);
router.post('/reset-password', PersonController.changePassword);

router.get('/project/:id', authenticateToken, AccessController(), PersonController.getAllPersonsByProject);
// router.get('/', PersonController.getAllPersons);
router.get('/:id', authenticateToken, PersonController.getPersonById);
router.post('/', authenticateToken, PersonController.createPerson);
router.put('/:id', authenticateToken, PersonController.updatePerson);
router.delete('/:id', authenticateToken, PersonController.deletePerson);

module.exports = router;