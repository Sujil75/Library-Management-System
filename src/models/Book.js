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
        type: [{
            type: String,
            trim: true,
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
        }],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    availableQuantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Book", BookSchema)