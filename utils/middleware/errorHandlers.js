const { config } = require('../../config/index');
const Boom = require('@hapi/boom');

function withErrorStack(error, stack) {
    if (config.dev) {
        return {...error, stack }
    }

    return error
}

function logErrors(err, req, res, next) {
    console.log(err);
    next(err)
}

function wrapError(err, req, res, next) {
    if (!err.isBoom) {
        next(Boom.badImplementation(err))
    }
    next(err);
}

function errorHadler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err;

    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack));
}

module.exports = {
    logErrors,
    errorHadler,
    wrapError,
}