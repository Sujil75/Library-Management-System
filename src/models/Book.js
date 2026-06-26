const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        trim: true,
        required: true,
        enum: [
            "Fiction",
            "Mystery",
            "Thriller",
            "Romance",
            "Fantasy",
            "Science Fiction",
            "Biography",
            "History",
            "Technology"
        ],
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    availableQuantity: {
        type: Number,
        required: true,
        min: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Book", BookSchema)