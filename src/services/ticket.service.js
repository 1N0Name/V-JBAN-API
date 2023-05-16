const {
    Person,
    Project,
    Ticket,
    TicketResponsible,
    TicketTag,
    Tag,
    TagCategory
 } = require("../models/connections.model");

class TicketService {
    async getAllProjectTickets(projectId) {
        try {
            const project = await Project.findByPk(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            const tickets = await Ticket.findAll({
                where: { project_id: projectId },
                include: [
                    { model: TicketTag, include: [{ model: Tag, attributes: ['name', 'category_id'], include: [{ model: TagCategory, attributes: ['name'] }] }] },
                    { model: TicketResponsible, include: [{ model: Person, attributes: ['first_name', 'last_name'] }] },
                ],
                attributes: ['id', 'title', 'descr', 'category_id', 'start_date', 'end_date'],
            });

            const formattedTickets = tickets.map((ticket) => {
                const tags = ticket.ticket_tags.map((ticketTag) => ({
                    tag_category: ticketTag.tag.tag_category.name,
                    value: ticketTag.tag.name,
                }));

                const responsible = ticket.ticket_responsibles.map((responsible) => ({
                    first_name: responsible.person.first_name,
                    last_name: responsible.person.last_name,
                }));

                return {
                    id: ticket.id,
                    title: ticket.title,
                    description: ticket.descr,
                    category_id: ticket.category_id,
                    tags,
                    start_date: ticket.start_date,
                    end_date: ticket.end_date,
                    responsible,
                };
            });

            return formattedTickets;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch tickets');
        }
    }

    async getAllUserTickets(userId) {
        try {
            const person = await Person.findByPk(userId);
            if (!person) {
                throw new Error('Person not found');
            }

            const tickets = await TicketResponsible.findAll({
                where: { person_id: userId },
                include: [
                    {
                        model: Ticket,
                        include: [
                            { model: TicketTag, include: [{ model: Tag, attributes: ['name', 'category_id'], include: [{ model: TagCategory, attributes: ['name'] }] }] },
                            { model: Project, attributes: ['title'] },
                        ],
                        attributes: ['id', 'title', 'descr', 'start_date', 'end_date'],
                    },
                ],
            });

            const formattedTickets = tickets.map(({ ticket }) => ({
                id: ticket.id,
                title: ticket.title,
                description: ticket.descr,
                projectName: ticket.project.title,
                tags: ticket.ticket_tags.map(({ tag }) => ({
                    tag_category: tag.tag_category.name,
                    value: tag.name,
                })),
                startDate: ticket.start_date,
                endDate: ticket.end_date,
            }));

            return formattedTickets;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch tickets');
        }
    }

    async getAllTickets() {
        try {
            return await Ticket.findAll();
        } catch (error) {
            throw new Error('Failed to get tickets');
        }
    }

    async getTicketById(id) {
        try {
            console.log(id);
            return await Ticket.findByPk(id);
        } catch (error) {
            console.log(error);
            throw new Error('Failed to get ticket');
        }
    }

    async createTicket(ticketData) {
        try {
            return await Ticket.create(ticketData);
        } catch (error) {
            throw new Error('Failed to create ticket');
        }
    }

    async updateTicket(id, ticketData) {
        try {
            const ticket = await Ticket.findByPk(id);
            if (ticket) {
                const updatedTicket = await ticket.update(ticketData);

                const socketManager = require('express').application.get('socketManager');
                socketManager.notify(ticket.project.id, 'ticketUpdated', { ticketId: ticket.id });

                return updatedTicket;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error('Failed to update ticket');
        }
    }

    async deleteTicket(id) {
        try {
            const ticket = await Ticket.findByPk(id);
            if (ticket) {
                await ticket.destroy();
                return true
            } else {
                return false;
            }
        } catch (error) {
            throw new Error('Failed to delete ticket');
        }
    }
}

module.exports = new TicketService();