class BaseError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        this.stack = '';
        // Error.captureStackTrace(this, this.constructor);
    }
}

class InvalidTokenError extends BaseError {
    constructor() {
        super(403, 'Transmitted token is invalid');
    }
}

// Export the error classes
module.exports = {
    BaseError,
    InvalidTokenError,
};