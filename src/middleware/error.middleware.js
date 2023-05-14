const { BaseError } = require('../utils/error.helper');

function errorHandler(err, req, res, next) {
    console.log(err);
    if (res.headersSent) {
        return next(err);
    }

    // Check the error type and generate the JSON response
    if (err instanceof BaseError) {
        return res.status(err.code).json({
            error_code: err.code,
            error_msg: err.message,
        });
    }

    // Handle other types of errors

    // Default response
    return res.status(500).json({ error: 'Internal Server Error' });
}

// Export the error handler middleware
module.exports = errorHandler;