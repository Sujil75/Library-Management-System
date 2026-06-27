const {body, validationResult} = require('express-validator');

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