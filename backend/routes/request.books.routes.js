const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    mainPageRequest
} = require('../controllers/request.books.controller');

//Request Endpoints
router.get('/', mainPageRequest);

module.exports = router;