const Book = require('../models/Book');
const User = require('../models/User');

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

module.exports.fetchMembers = async () => {
    const members = await User.find();

    if (members.length === 0) {
        const err = new Error("Members yet to be added found");
        err.status = 404;
        
        throw err;
    };

    return {
        data: members,
        message: "Members list fetched successfully",
    };
};

module.exports.removeMember = async (id) => {
    const member = await User.findById(id);
    
    if (!member) {
        const err = new Error("Member not found");
        err.status = 404;
        
        throw err;
    };

    const librarianCount = await User.countDocuments({
        role: "Librarian",
    });

    if (librarianCount === 1 && member.role === "Librarian") {
        const err = new Error("Only one member remains and is librarian, cant delete the member");
        err.status = 400;
        
        throw err;
    };

    await User.findByIdAndDelete(id);

    return "Member deleted successfully";
};