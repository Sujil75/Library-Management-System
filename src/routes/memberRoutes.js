const express = require('express');
const { 
    addBook, 
    fetchBooks, 
    fetchSingleBook, 
    putBook, 
    deleteBook, 
    getMembers,
    deleteMember
} = require('../controllers/memberController');
const { bookValidation, validate } = require('../validators/validationRules');
const userAuthenticator = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Book Methods
router.post('/books/', userAuthenticator, roleMiddleware('Librarian'), bookValidation, validate, addBook);

router.get('/books/', userAuthenticator, roleMiddleware("Librarian", "Member"), fetchBooks);

router.get('/books/:id', userAuthenticator, roleMiddleware("Librarian", "Member"), fetchSingleBook);

router.put('/books/:id', userAuthenticator, roleMiddleware("Librarian"), bookValidation, validate, putBook);

router.delete("/books/:id", userAuthenticator, roleMiddleware("Librarian"), deleteBook);


// Members Methods
router.get('/members', userAuthenticator, roleMiddleware('Librarian'), getMembers);

router.delete("/members/:id", userAuthenticator, roleMiddleware("Librarian"), deleteMember);

module.exports = router;