const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const User = require('../models/User');

const secret = process.env.JWT_SECRET

const createUser = async body => {
    const existingUser = await User.findOne({
        $or: [
            {name: body.name},
            {email: body.email},
        ]
    });

    if (existingUser) {
        const err = new Error(
            existingUser.email === body.email ?
                "Email already taken" :
                "User already exists"
        );

        err.status = 409;
        
        throw err;
    };

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newBody = {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: body.role,
    }

    await User.create(newBody);

    return "User created successfully";
};

const accessUser = async ({email, password}) => {
    const admin = await User.findOne({email});

    if (!admin) {
        const err = new Error("User not found");
        err.status = 404;

        throw err;
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        const err = new Error("Invalid Password");
        err.status = 400;

        throw err;
    }

    const reqBody = {
        id: admin.id,
        email,
        role: admin.role,
    }

    const token = jwt.sign(
        reqBody, secret, {
            expiresIn: '1d'
        }
    )

    return {
        message: "User logged in",
        token
    }
};

module.exports = {
    createUser,
    accessUser,
}