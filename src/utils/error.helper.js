class BaseError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        this.stack = '';
        // Error.captureStackTrace(this, this.constructor);
    }
}

class TokenNotProvidedError extends BaseError {
    constructor() {
        super(400, 'Токен не был предоставлен');
    }
}

class InvalidTokenError extends BaseError {
    constructor() {
        super(403, 'Время действия токена истекло');
    }
}

class TokenExpiredError extends BaseError {
    constructor() {
        super(401, 'Переданный для авторизации токен не валиден');
    }
}

class EmailNotConfirmedError extends BaseError {
    constructor() {
        super(403, 'Email is not confirmed');
    }
}

class InvalidCredentialsError extends BaseError {
    constructor() {
        super(401, 'Invalid login or password');
    }
}

class EmailAlreadyRegisteredError extends BaseError {
    constructor() {
        super(409, 'Email is already registered');
    }
}

class InvalidRegistrationCodeError extends BaseError {
    constructor() {
        super(400, 'Invalid registration code');
    }
}

class InvalidRefreshTokenError extends BaseError {
    constructor() {
        super(400, 'Invalid refresh token');
    }
}

class UserNotFound extends BaseError {
    constructor() {
        super(404, 'User not found');
    }
}

class InvalidResetTokenError extends BaseError {
    constructor() {
        super(404, 'User not found');
    }
}

// Export the error classes
module.exports = {
    BaseError,
    InvalidTokenError,
    TokenExpiredError,
    TokenNotProvidedError,
    EmailNotConfirmedError,
    InvalidCredentialsError,
    EmailAlreadyRegisteredError,
    InvalidRegistrationCodeError,
    InvalidRefreshTokenError,
    UserNotFound,
    InvalidResetTokenError
};