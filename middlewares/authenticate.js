const jwt = require("jsonwebtoken");

const {User} = require("../models/user");

const {HttpsError} = require("../error_handler");

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") {
        next(HttpsError(401));
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token || user.token !== token) {
            next(HttpsError(401)); 
        }
        req.user = user;
        next();
    }
    catch {
        next(HttpsError(401));
    }
}

module.exports = authenticate;