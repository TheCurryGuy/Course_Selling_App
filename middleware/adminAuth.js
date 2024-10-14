const jwt = require("jsonwebtoken");
const { JWT_SECRET_ADMIN } = require("../config");


function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;

    const response = jwt.verify(token, JWT_SECRET_ADMIN)

    if (response) {
        req.adminId = response.id;//as the payload was id not userid
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = {
    adminMiddleware : adminMiddleware   
}