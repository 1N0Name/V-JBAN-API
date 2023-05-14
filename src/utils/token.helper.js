const jwt = require('jsonwebtoken');

class TokenHelper {
    generateAccessToken(person, salt, expiration) {
        const payload = {
            id: person.id,
        };

        return jwt.sign(payload, salt, { expiresIn: expiration });
    }

    generateRefreshToken(salt, expiration) {
        const refreshToken = jwt.sign({}, salt, { expiresIn: expiration });
        return refreshToken;
    }
}

module.exports = new TokenHelper();