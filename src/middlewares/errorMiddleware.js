const errorMiddleware = (err, req, res, next) => {
    // console.error(err);

    const statusCode = err.status || 500

    if (err.code === 11000) {
        res.status(409).json({
        success: false,
        status: 409,
        code: 11000,
        message: "Duplicate Keys found",
    });
    };

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: err.message || "Internal service error",
        errors: err.errors || [],
    });
};

module.exports = errorMiddleware