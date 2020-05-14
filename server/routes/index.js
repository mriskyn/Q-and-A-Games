const express = require('express');
const router = express.Router();
const questionRoute = require('./questionRoute');

router.use('/questions', questionRoute);

module.exports = router;