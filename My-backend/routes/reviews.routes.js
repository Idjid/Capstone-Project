const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createReview,
    getReview
} = require('../controllers/reviews.controller');

//Review Endpoints
router.post('/reviews', auth, createReview);
router.get('/:id', auth, getReview);

module.exports = router;