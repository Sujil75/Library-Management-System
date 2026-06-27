const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            const err = new Error("Access denied");
            err.statusCode = 403;
            return next(err);
        };

        next();
    };
};

module.exports = roleMiddleware;