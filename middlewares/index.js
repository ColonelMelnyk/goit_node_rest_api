const validateBody = require("./validateBody");
const isValidId = require("./validId");
const authenticate = require("./authenticate");
const upload = require("./upload");
const avatarSize = require("./avatarSize");
module.exports = {
    validateBody,
    isValidId,
    authenticate,
    upload,
    avatarSize
}