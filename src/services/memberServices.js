const Book = require('../models/Book');

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

module.exports.getBookList = async () => {
    const books = await Book.find();

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