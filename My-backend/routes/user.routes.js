const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {
    getProfile,
    getAllUsers,
    deleteUser,
    deleteAccount
} = require('../controllers/user.controller');

//User Endpoints
router.get('/me', auth, getProfile);
router.get('/', auth, getAllUsers);
router.delete('/:id', auth, deleteUser);
router.delete('/me', auth, deleteAccount);

module.exports = router;