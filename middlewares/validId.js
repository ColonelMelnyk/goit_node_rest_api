const {isValidObjectId} = require("mongoose");

const {HttpsError} = require("../error_handler");

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        next(HttpsError(400, `${id} is not valid id`))
    }
    next();
}

module.exports = isValidId;