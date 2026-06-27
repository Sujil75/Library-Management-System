const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const userAuthenticator = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
    
        if (!authHeader) {
            const err = new Error("Unauthorized access");
            err.status = 401;

            return next(err);
        };

        const token = authHeader.split(' ')[1];

        const verifyToken = await jwt.verify(token, secret);

        if (!verifyToken) {
            const err = new Error("Invalid token");
            err.status = 403;

            return next(err);
        };

        req.user = verifyToken;

        next();
    } catch(err) {
        error.status = 401;
        next(error);
    };
}

module.exports = userAuthenticator;