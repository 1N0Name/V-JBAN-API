const jwt = require('jsonwebtoken');
const { accessToken } = require('../../config/auth.config');
const {
    TokenExpiredError, 
    InvalidTokenError,
    TokenNotProvidedError,
} = require('../utils/error.helper');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(new TokenNotProvidedError());
    }

    try {
        const decoded = jwt.verify(token, accessToken.salt);
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return next(new TokenExpiredError());
        }
        
        next(new InvalidTokenError());
    }
}

module.exports = { authenticateToken };