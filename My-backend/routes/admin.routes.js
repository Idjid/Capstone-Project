const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const auth = require('../middleware/auth');
const {
    getAllUsers,
    getOneUser,
    getAllBooks,
    deleteUser,
    deleteBook
} = require('../controllers/admin.controller');

//Admin Endpoints
router.get('/users', auth, getAllUsers);
router.get('/user/:userId', auth, getOneUser);
router.get('/books', auth, getAllBooks);
router.get('/users', auth, adminController.getAllUsers);
router.delete('/users/:userId', auth, deleteUser);
router.delete('/books/bookId', auth, deleteBook);

module.exports = router;