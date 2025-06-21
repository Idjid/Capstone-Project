const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createReview,
    getReview,
    deleteReview
} = require('../controllers/reviews.controller');

//Review Endpoints
router.post('/', auth, createReview);
router.get('/:id', auth, getReview);
router.delete('/:id', auth, deleteReview);

module.exports = router;