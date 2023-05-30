const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../public')));

// API icon
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));

// Routes
const authRoute = require('./routes/auth.route');
const personRoute = require('./routes/person.route');
const projectRoute = require('./routes/project.route');
const ticketRoute = require('./routes/ticket.route');
const roleRoute = require('./routes/role.route');
const projectCategoryRoute = require('./routes/project_category.route');
const { authenticateToken } = require('./middleware/auth.middleware');

app.use('/api', authRoute);
app.use('/api/user', personRoute);
app.use('/api/project', authenticateToken, projectRoute);
app.use('/api/ticket', authenticateToken, ticketRoute);
app.use('/api/role', authenticateToken, roleRoute);
app.use('/api/role', authenticateToken, projectCategoryRoute);

// Middleware
const errorHandler = require('./middleware/error.middleware');
app.use(errorHandler);

// WebSocket
const server = http.createServer(app);
const SocketManager = require('./utils/socket_manager.helper');
const socketManager = new SocketManager(server);
socketManager.init();

app.set('socketManager', socketManager);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});