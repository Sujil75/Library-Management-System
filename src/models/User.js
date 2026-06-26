const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        require: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Member", "Librarian"]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", UserSchema)