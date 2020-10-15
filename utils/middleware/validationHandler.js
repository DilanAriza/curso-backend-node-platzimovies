const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

function validate(data, schema) {
    const { error } = Joi
        .object(schema)
        .validate(data, { errors: { stack: true } });
    // const { error } = Joi.object(schema).valid(data);
    return error;
}

function validationHandler(schema, check = "body") {
    return function(req, res, next) {
        const error = validate(req[check], schema);
        (error) ? next(Boom.badRequest(error)): next();
    };
}

module.exports = validationHandler;