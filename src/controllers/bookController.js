const { 
    createBook, 
    getBookList, 
    getBook, 
    updateBook, 
    removeBook,
    borrowBook,
    returnBook
} = require("../services/bookServices");

module.exports.addBook = async (req, res, next) => {
    try {
        const body = req.body;

        if (Object.keys(body).length === 0) {
            const err = new Error("Request body missing");
            err.status = 404;

            throw err;
        };

        const message = await createBook(body);

        res.status(201).json({
            success: true,
            status: 201,
            message
        })
    } catch (err) {
        next(err);
    };
};

module.exports.fetchBooks = async (req, res, next) => {
    try {
        const {page, limit, search, category} = req.query;
        const book = await getBookList(page, limit, search, category);

        res.status(200).json({
            success: true,
            status: 200,
            message: book.message,
            data: book.data
        });
    } catch(err) {
        next(err);
    };
};

module.exports.fetchSingleBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const book = await getBook(id);

        res.status(200).json({
            success: true,
            status: 200,
            message: book.message,
            data: book.data,
        });
    } catch (err) {
        next(err);
    };
};

module.exports.putBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;

        if (!id) {
            const err = new Error("Provide a valid ID");
            err.status = 405;

            throw err;
        };
        
        const message = await updateBook(id, body);

        res.status(200).json({
            success: true,
            status: 200,
            message,
        });
    } catch (err) {
        next(err);
    };
};

module.exports.deleteBook = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            const err = new Error("Provide a valid ID");
            err.status = 405;

            throw err;
        };
        
        const message = await removeBook(id);

        res.status(200).json({
            success: true,
            status: 200,
            message,
        });
    } catch (err) {
        next(err);
    };
};

// Borrow book
module.exports.memberBorrow = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const memberId = req.user.id;

        if (!bookId) {
            const err = new Error("Provide a valid ID");
            err.status = 405;

            throw err;
        };

        const message = await borrowBook(bookId, memberId);

        res.status(200).json({
            success: true,
            status: 200,
            message,
        });
    } catch(err) {
        next(err);
    };
};

// Return book
module.exports.memberReturn = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const memberId = req.user.id;

        if (!bookId) {
            const err = new Error("Provide a valid ID");
            err.status = 405;

            throw err;
        };

        const message = await returnBook(bookId, memberId);

        res.status(200).json({
            success: true,
            status: 200,
            message,
        });
    } catch(err) {
        next(err);
    };
};