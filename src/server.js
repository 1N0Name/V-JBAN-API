const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());

// Routes
const authRoute = require('./routes/auth.route');
const personRoute = require('./routes/person.route');
const projectRoute = require('./routes/project.route');
const ticketRoute = require('./routes/ticket.route')
const { authenticateToken } = require('./middleware/auth.middleware');

app.use('/api', authRoute);
app.use('/api/users', authenticateToken, personRoute);
app.use('/api/projects', authenticateToken, projectRoute);
app.use('/api/tickets', authenticateToken, ticketRoute);

// Middleware
const errorHandler = require('./middleware/error.middleware');
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});