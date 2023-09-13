const {HttpsError} = require("../error_handler");

const validateBody = schema => {
    const func = (req, res, next)=> {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpsError(400, error.message));
        }
        next()
    }

    return func;
}

module.exports = validateBody;