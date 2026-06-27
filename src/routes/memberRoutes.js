const express = require('express');
const {
    getMembers,
    deleteMember
} = require('../controllers/memberController');
const userAuthenticator = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Members Methods
router.get('/', userAuthenticator, roleMiddleware('Librarian'), getMembers);

router.delete("/:id", userAuthenticator, roleMiddleware("Librarian"), deleteMember);

module.exports = router;