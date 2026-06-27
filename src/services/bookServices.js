const Book = require("../models/Book");
const Borrow = require("../models/Borrow");

module.exports.createBook = async body => {
    const existingBook = await Book.findOne({isbn: body.isbn});

    if (existingBook) {
        const err = new Error("Book already exists");
        err.status = 409;

        throw err;
    };

    await Book.create(body);

    return "Book added successfully";
};

module.exports.getBookList = async (page = 1, limit = 10, search, category) => {
    page = Number(page);
    limit = Number(limit);

    const filter = {};

    if (search) {
        filter.title = {
            $regex: search,
            $options: "i",
        };
    };

    if (category) {
        filter.category = category;
    };

    const books = await Book.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);

    if (books.length === 0) {
        const err = new Error("No books found");
        err.status = 404;
        
        throw err;
    };

    return {
        data: books,
        message: "Books fetched successfully",
    };
}; 

module.exports.getBook = async (id) => {
    const book = await Book.findById(id);

    if (!book) {
        const err = new Error("Book not found");
        err.status = 404;
        
        throw err;
    };

    return {
        data: book,
        message: "Book fetched successfully",
    };
};

module.exports.updateBook = async (id, body) => {
    const existingBook = await Book.find();
    const existingIds = existingBook.map(each => each._id.toString());
    
    if (!existingIds.includes(id)) {
        const err = new Error("Book not found");
        err.status = 404;
        
        throw err;
    };

    await Book.findByIdAndUpdate(id, body);

    return "Book updated successfully";
};

module.exports.removeBook = async (id) => {
    const existingBook = await Book.find();
    const existingIds = existingBook.map(each => each._id.toString());
    
    if (!existingIds.includes(id)) {
        const err = new Error("Book not found");
        err.status = 404;
        
        throw err;
    };

    await Book.findByIdAndDelete(id);

    return "Book deleted successfully";
};

// Borrow book
module.exports.borrowBook = async (bookId, memberId) => {
    const existingBorrow = await Borrow.findOne({
        memberId,
        bookId,
        status: "Borrowed",
    });

    if (existingBorrow) {
        const err = new Error("You have already borrowed the book");
        err.status = 409;
        
        throw err;
    };

    const book = await Book.findById(bookId);

    if (!book) {
        const err = new Error("Book does not exist");
        err.status = 404;
        
        throw err;
    };

    if (book.availableQuantity <= 0) {
        const err = new Error("Book is currently unavailable");
        err.status = 404;
        
        throw err;
    };

    const borrowData = {
        memberId,
        bookId,
        borrowDate: new Date(),
        status: "Borrowed",
    };
    
    await Borrow.create(borrowData);
    await Book.findByIdAndUpdate(bookId, {
        $inc: {
            availableQuantity: -1,
        }
    })
    
    return `Member borrowed book: ${book.title}`;
};

module.exports.returnBook = async (bookId, memberId) => {
    const borrowBook = await Borrow.findOne({
        memberId,
        bookId,
        status: "Borrowed",
    });

    const alreadyReturned = await Borrow.findOne({
        _id: borrowBook._id,
        memberId,
        bookId,
        status: "Returned",
    });

    if (alreadyReturned) {
        const err = new Error("You have already returned the book");
        err.status = 409;
        throw err;
    }

    if (!borrowBook) {
        const err = new Error("You have not borrowed the book");
        err.status = 409;
        throw err;
    }

    const book = await Book.findById(bookId);

    if (!book) {
        const err = new Error("Book not found");
        err.status = 404;
        throw err;
    }

    await Borrow.findByIdAndUpdate(borrowBook._id, {
        status: "Returned",
        returnDate: new Date(),
    });

    await Book.findByIdAndUpdate(bookId, {
        $inc: {
            availableQuantity: 1,
        },
    });

    return `Thank you for returning: ${book.title}`;
};