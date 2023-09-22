const HttpsError = require("./httpsError");
const handleMongooseError = require("./mongooseError");
const ctrlWrapper = require("./ctrlWrapper");
module.exports = {
    HttpsError,
    handleMongooseError,
    ctrlWrapper,
}