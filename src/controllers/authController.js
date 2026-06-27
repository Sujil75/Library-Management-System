const { createUser, accessUser } = require("../services/authServices");

const registerUser = async (req, res, next) => {
    try {
        const data = req.body;

        if (Object.keys(data).length === 0) {
            const err = new Error("Request body missing");
            err.status = 404;

            throw err;
        };

        const message = await createUser(data);

        return res.status(201).json({
            success: true,
            status: 200,
            message
        });
    } catch(err) {
        next(err)
    };
};

const loginUser = async (req, res, next) => {
    try {
        const body = req.body;

        if (Object.keys(body).length === 0) {
            const err = new Error("Request body missing");
            err.status = 404;

            throw err;
        }

        const data = await accessUser(body);

        return res.status(200).json({
            success: true,
            status: 200,
            token: data.token,
            message: data.message,
        });
    } catch(err) {
        next(err);
    };
}

module.exports = {
    registerUser,
    loginUser,
}