const mongoose = require('mongoose')

const BorrowSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    borrowDate: {
        type: Date,
        trim: true,
        default: Date.now,
    },
    returnDate: {
        type: Date,
        trim: true,
        default: Date.now,
    },
    status: {
        type: String,
        enum: [
            "Borrowed",
            "Returned",
        ],
        default: "Borrowed"
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Borrow", BorrowSchema)