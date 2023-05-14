const Person = require('./person.model');
const Project = require('./project.model');
const Role = require('./role.model');
const Category = require('./category.model');
const Ticket = require('./ticket.model');
const TicketResponsible = require('./ticket_responsible.model');
const Message = require('./message.model');
const PersonProject = require('./person_project.model');
const TagCategory = require('./tag_category.model');
const Tag = require('./tag.model');
const TicketTag = require('./ticket_tag.model');
const Token = require('./token.model');

// Establishing associations

Person.hasMany(Project, { foreignKey: 'owner_id', as: false });
Person.hasMany(TicketResponsible, { foreignKey: 'person_id', as: false });
Person.hasMany(Message, { foreignKey: 'person_id', as: false });
Person.hasMany(PersonProject, { foreignKey: 'person_id', as: false });
Person.hasMany(Token, { foreignKey: 'person_id', as: false });

Project.belongsTo(Person, { foreignKey: 'owner_id', as: false });
Project.hasMany(Ticket, { foreignKey: 'ticket_id', as: false });
Project.hasMany(Role, { foreignKey: 'project_id', as: false });
Project.hasMany(Category, { foreignKey: 'project_id', as: false });
Project.hasMany(Message, { foreignKey: 'project_id', as: false });
Project.hasMany(PersonProject, { foreignKey: 'project_id', as: false });

Role.belongsTo(Project, { foreignKey: 'project_id', as: false });
Role.hasMany(PersonProject, { foreignKey: 'role_id', as: false });

Category.belongsTo(Project, { foreignKey: 'project_id', as: false });
Category.hasMany(Ticket, { foreignKey: 'category_id', as: false });

Ticket.belongsTo(Category, { foreignKey: 'category_id', as: false });
Ticket.belongsTo(Project, { foreignKey: 'project_id', as: false });
Ticket.hasMany(TicketResponsible, { foreignKey: 'ticket_id', as: false });
Ticket.hasMany(Message, { foreignKey: 'ticket_id', as: false });
Ticket.hasMany(TicketTag, { foreignKey: 'ticket_id', as: false });

TicketResponsible.belongsTo(Ticket, { foreignKey: 'ticket_id', as: false });
TicketResponsible.belongsTo(Person, { foreignKey: 'person_id', as: false });

Message.belongsTo(Person, { foreignKey: 'person_id', as: false });
Message.belongsTo(Ticket, { foreignKey: 'ticket_id', as: false });
Message.belongsTo(Project, { foreignKey: 'project_id', as: false });

PersonProject.belongsTo(Person, { foreignKey: 'person_id', as: false });
PersonProject.belongsTo(Project, { foreignKey: 'project_id', as: false });
PersonProject.belongsTo(Role, { foreignKey: 'role_id', as: false });

TagCategory.hasMany(Tag, { foreignKey: 'category_id', as: false });

Tag.belongsTo(TagCategory, { foreignKey: 'category_id', as: false });
Tag.hasMany(TicketTag, { foreignKey: 'tag_id', as: false });

TicketTag.belongsTo(Ticket, { foreignKey: 'ticket_id', as: false });
TicketTag.belongsTo(Tag, { foreignKey: 'tag_id', as: false });

Token.belongsTo(Person, { foreignKey: 'person_id', as: false });

module.exports = {
    Person,
    Project,
    PersonProject,
    Role,
    Category,
    Ticket,
    TicketResponsible,
    Message,
    Person,
    TagCategory,
    Tag,
    TicketTag,
    Token
};