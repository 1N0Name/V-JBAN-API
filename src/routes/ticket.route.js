const express = require('express');
const TicketController = require('../controllers/ticket.controller');

const router = express.Router();

router.get('/user', TicketController.getAllUserTickets);
router.get('/project/:id', TicketController.getAllProjectTickets);

router.get('/', TicketController.getAllTickets);
router.get('/:id', TicketController.getTicketById);
router.post('/', TicketController.createTicket);
router.put('/:id', TicketController.updateTicket);
router.delete('/:id', TicketController.deleteTicket);

module.exports = router;