const express = require('express');
const { 
    addBook, 
    fetchBooks, 
    fetchSingleBook, 
    putBook, 
    deleteBook,
    memberBorrow,
    memberReturn
} = require('../controllers/bookController');
const { bookValidation, validate } = require('../validators/validationRules');
const userAuthenticator = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Book Methods
router.post('/', userAuthenticator, roleMiddleware('Librarian'), bookValidation, validate, addBook);

router.get('/', userAuthenticator, roleMiddleware("Librarian", "Member"), fetchBooks);

router.get('/:id', userAuthenticator, roleMiddleware("Librarian", "Member"), fetchSingleBook);

router.put('/:id', userAuthenticator, roleMiddleware("Librarian"), bookValidation, validate, putBook);

router.delete("/:id", userAuthenticator, roleMiddleware("Librarian"), deleteBook);

// Borrow book(s)
router.post("/:id/borrow", userAuthenticator, roleMiddleware("Member"), memberBorrow);

// Return book
router.post("/:id/return", userAuthenticator, roleMiddleware("Member"), memberReturn);


module.exports = router;