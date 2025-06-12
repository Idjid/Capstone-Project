const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    userRegister,
    userLogin
} = require('../controllers/auth.controller');

//Authentication Endpoints
router.post('/register', auth, userRegister);
router.post('/login', auth, userLogin);

module.exports = router;