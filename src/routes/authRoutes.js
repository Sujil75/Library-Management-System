const express = require('express');
const {registerUser, loginUser} = require('../controllers/authController');
const { 
    registerValidation, 
    validate, 
    loginValidation
} = require('../validators/validationRules');

const router = express.Router();

router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);

module.exports = router;