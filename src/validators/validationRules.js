const {body, validationResult} = require('express-validator');

const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Science Fiction",
    "Biography",
    "History",
    "Technology"
];

// Register Validator
module.exports.registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide valid Email"),
    body("password")
        .isLength({min: 6})
        .withMessage("Password length must be of 6 characters long"),
    body("role")
        .isIn(["Member", "Librarian"])
        .withMessage("Role must be explicitly either Member or Librarian"),
];

// Login validator
module.exports.loginValidation = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid Email"),
    body("password")
        .isLength({min: 6})
        .withMessage("Password is required"),
];

module.exports.bookValidation = [
    body().custom((value) => {
        const books = Array.isArray(value) ? value : [value];

        for (let book of books) {
            if (!book.title || book.title.trim() === "") {
                throw new Error("Title is required");
            };

            if (!book.author || book.author.trim() === "") {
                throw new Error("Author name is required");
            };

            if (!book.isbn || book.isbn.trim() === "") {
                throw new Error("ISBN code is required");
            };

            if (!Array.isArray(book.category) || book.category.length === 0) {
                throw new Array("At least one category required");
            };

            for (const category of book.category) {
                if (!categories.includes(category)) {
                    throw new Error("Invalid category: ", category);
                };
            };

            if (!Number.isInteger(book.quantity) || book.quantity < 0) {
                throw new Error("Quantity can't be an non-integer");
            };

            if (
                book.availableQuantity !== undefined &&
                (!Number.isInteger(book.availableQuantity) ||
                book.availableQuantity < 0)
            ) {
                throw new Error("Available quantity must be a non-negative integer");
            };
        }

        return true;
    })
];

module.exports.validate = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        const err = new Error("Validation failed");
        err.status = 400;
        err.errors = error.array();
        
        return next(err);
    }
    
    next()
}