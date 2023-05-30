const express = require('express');
const { AccessController } = require('../middleware/access_controller.middleware');
const TicketController = require('../controllers/ticket.controller');

const router = express.Router();

router.get('/user', TicketController.getAllUserTickets);
router.get('/project/:id', AccessController(), TicketController.getAllProjectTickets);

// router.get('/', AccessController('ticket') , TicketController.getAllTickets);
router.get('/:id', AccessController(), TicketController.getTicketById);
router.post('/', AccessController(), TicketController.createTicket);
router.put('/:id', AccessController(), TicketController.updateTicket);
router.delete('/:id', AccessController(), TicketController.deleteTicket);

module.exports = router;