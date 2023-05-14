const jwt = require('jsonwebtoken');
const { accessToken } = require('../../config/auth.config');
const { InvalidTokenError } = require('../utils/error.helper');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, accessToken.salt);
        req.user = decoded;
        next();
    } catch (error) {
        // return res.sendStatus(403);
        next(new InvalidTokenError());
    }
}

module.exports = { authenticateToken };