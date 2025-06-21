const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const auth = require('../middleware/auth');
const {
    getAllUsers,
    getOneUser,
    getAllBooks,
    deleteUser,
    deleteBook,
    postBook
} = require('../controllers/admin.controller');


router.get('/users', auth, getAllUsers);
router.get('/users/:id', auth, getOneUser);
router.get('/books', auth, getAllBooks);
router.delete('/users/:id', auth, deleteUser);
router.delete('/books/:id', auth, deleteBook);
router.post('/books', auth, postBook);

module.exports = router;