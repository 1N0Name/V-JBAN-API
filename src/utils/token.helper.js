const jwt = require('jsonwebtoken');

class TokenHelper {
    generateAccessToken(payload, salt, expiration) {
        return jwt.sign(payload, salt, { expiresIn: expiration });
    }

    generateRefreshToken(salt, expiration) {
        const refreshToken = jwt.sign({}, salt, { expiresIn: expiration });
        return refreshToken;
    }

    generateInvitationToken(payload, salt, expiration) {
        return jwt.sign(payload, salt, { expiresIn: expiration });
    }
}

module.exports = new TokenHelper();