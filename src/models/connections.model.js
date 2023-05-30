const Message = require('./message.model');
const Person = require('./person.model');
const Ticket = require('./ticket.model');
const Project = require('./project.model');
const PersonProject = require('./person_project.model');
const Role = require('./role.model');
const TagCategory = require('./tag_category.model');
const Tag = require('./tag.model');
const Chat = require('./chat.model');
const ProjectCategory = require('./project_category.model');
const TicketTag = require('./ticket_tag.model');
const Action = require('./action.model');
const Token = require('./token.model');
const PersonRole = require('./person_role.model');
const PersonTicket = require('./person_ticket.model');
const RoleAction = require('./role_action.model');
const Invite = require('./invite.model');

// Action
Action.hasMany(RoleAction, { foreignKey: 'action_id', as: false });

// Chat
Chat.hasMany(Message, { foreignKey: 'chat_id', as: false });
Chat.hasMany(Project, { foreignKey: 'chat_id', as: false });
Chat.hasMany(Ticket, { foreignKey: 'chat_id', as: false });

// Message
Message.belongsTo(Person, { foreignKey: 'sender_id', as: false });
Message.belongsTo(Chat, { foreignKey: 'chat_id', as: false });

// Person
Person.hasMany(Message, { foreignKey: 'sender_id', as: false })
Person.hasMany(PersonRole, { foreignKey: 'person_id', as: false })
Person.hasMany(Token, { foreignKey: 'person_id', as: false })
Person.hasMany(PersonProject, { foreignKey: 'person_id', as: false })
Person.hasMany(Project, { foreignKey: 'owner_id', as: false })
Person.hasMany(PersonTicket, { foreignKey: 'person_id', as: false })

// PersonProject
PersonProject.belongsTo(Person, { foreignKey: 'person_id', as: false });
PersonProject.belongsTo(Project, { foreignKey: 'project_id', as: false });

// PersonRole
PersonRole.belongsTo(Person, { foreignKey: 'person_id', as: false });
PersonRole.belongsTo(Role, { foreignKey: 'role_id', as: false });

// PersonTicket
PersonTicket.belongsTo(Ticket, { foreignKey: 'ticket_id', as: false });
PersonTicket.belongsTo(Person, { foreignKey: 'person_id', as: false });

// Project
Project.hasMany(PersonProject, { foreignKey: 'project_id', as: false });
Project.hasMany(Role, { foreignKey: 'project_id', as: false });
Project.hasMany(ProjectCategory, { foreignKey: 'project_id', as: false });
Project.hasMany(Ticket, { foreignKey: 'project_id', as: false });
Project.belongsTo(Chat, { foreignKey: 'chat_id', as: false });
Project.belongsTo(Person, { foreignKey: 'owner_id', as: false });

// ProjectCategory
ProjectCategory.hasMany(Ticket, { foreignKey: 'category_id', as: false });
ProjectCategory.belongsTo(Project, { foreignKey: 'project_id', as: false });

// Role
Role.belongsTo(Project, { foreignKey: 'project_id', as: false });
Role.hasMany(RoleAction, { foreignKey: 'role_id', as: false });
Role.hasMany(PersonRole, { foreignKey: 'role_id', as: false });

// RoleAction
RoleAction.belongsTo(Role, { foreignKey: 'role_id', as: false });
RoleAction.belongsTo(Action, { foreignKey: 'action_id', as: false });

// Tag
Tag.hasMany(TicketTag, { foreignKey: 'tag_id', as: false });
Tag.belongsTo(TagCategory, { foreignKey: 'category_id', as: false });

// TagCategory
TagCategory.hasMany(Tag, { foreignKey: 'category_id', as: false });

// Ticket
Ticket.hasMany(TicketTag, { foreignKey: 'ticket_id', as: false });
Ticket.hasMany(PersonTicket, { foreignKey: 'ticket_id', as: false });
Ticket.belongsTo(Project, { foreignKey: 'project_id', as: false });
Ticket.belongsTo(ProjectCategory, { foreignKey: 'category_id', as: false });
Ticket.belongsTo(Chat, { foreignKey: 'chat_id', as: false });

// TicketTag
TicketTag.belongsTo(Ticket, { foreignKey: 'ticket_id', as: false });
TicketTag.belongsTo(Tag, { foreignKey: 'tag_id', as: false });

// Token
Token.belongsTo(Person, { foreignKey: 'person_id', as: false });

module.exports = {
    Message,
    Person,
    Ticket,
    Project,
    PersonProject,
    Role,
    TagCategory,
    Tag,
    Chat,
    ProjectCategory,
    TicketTag,
    Action,
    Token,
    PersonRole,
    PersonTicket,
    RoleAction,
    Invite,
};