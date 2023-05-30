require('dotenv').config();

module.exports = {
    accessToken: {
        salt: process.env.ACCESS_TOKEN_SALT,
        expired: process.env.ACCESS_TOKEN_EXPIRED,
        type: 'access',
    },
    refreshToken: {
        salt: process.env.REFRESH_TOKEN_SALT,
        expired: process.env.REFRESH_TOKEN_EXPIRED,
        type: 'refresh',
    },
    inviteToken: {
        salt: process.env.INVITE_TOKEN_SALT,
        expired: process.env.INVITE_TOKEN_EXPIRED,
        type: 'refresh',
    },
};