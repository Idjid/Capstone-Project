const express = require('express');
const router = express.Router();

const {
    mainPageRequest,
    getRecommendations 
} = require('../controllers/request.books.controller');


router.get('/', mainPageRequest);
router.get('/recommendations', getRecommendations);

module.exports = router;
