const TicketService = require('../services/ticket.service');

class TicketController {
    async getAllUserTickets(req, res, next) {
        try {
            const userId = req.user.id;
            const tickets = await TicketService.getAllUserTickets(userId);
            res.json(tickets);
        } catch (error) {
            next(error);
        }
    }

    async getAllProjectTickets(req, res, next) {
        try {
            const projectId = req.params.id;
            const tickets = await TicketService.getAllProjectTickets(projectId);
            res.json(tickets);
        } catch (error) {
            next(error);
        }
    }

    async getAllTickets(req, res) {
        try {
            const tickets = await TicketService.getAllTickets();
            res.json(tickets);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get tickets' });
        }
    }

    async getTicketById(req, res) {
        try {
            const ticket = await TicketService.getTicketById(req.params.id);
            if (ticket) {
                res.json(ticket);
            } else {
                res.status(404).json({ error: 'Ticket not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to get ticket' });
        }
    }

    async createTicket(req, res) {
        try {
            const ticketData = req.body;
            const createdTicket = await TicketService.createTicket(ticketData);
            res.status(201).json(createdTicket);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create ticket' });
        }
    }

    async updateTicket(req, res) {
        try {
            const ticketId = req.params.id;
            const ticketData = req.body;
            const updatedTicket = await TicketService.updateTicket(ticketId, ticketData);
            if (updatedTicket) {
                res.json(updatedTicket);
            } else {
                res.status(404).json({ error: 'Ticket not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update ticket' });
        }
    }

    async deleteTicket(req, res) {
        try {
            const ticketId = req.params.id;
            const deletedTicket = await TicketService.deleteTicket(ticketId);
            if (deletedTicket) {
                res.json({ message: 'Ticket deleted successfully' });
            } else {
                res.status(404).json({ error: 'Ticket not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete ticket' });
        }
    }
}

module.exports = new TicketController();