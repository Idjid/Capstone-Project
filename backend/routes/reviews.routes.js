const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createReview,
    getReview,
    deleteReview,
    averageRating
} = require('../controllers/reviews.controller');

//Review Endpoints
router.post('/', auth, createReview);
router.get('/:id/reviews', getReview);
router.get('/:id/average-rating', averageRating);
router.delete('/:id', auth, deleteReview);


module.exports = router;