const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    addFavorite,
    getFavorite,
    deleteFavorite
} = require('../controllers/favorite.controller');

//Favorite Endpoints
router.post('/', auth, addFavorite);
router.get('/', auth, getFavorite);
router.delete('/:bookId', auth, deleteFavorite);

module.exports = router;