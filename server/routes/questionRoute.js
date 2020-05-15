const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/QuestionController');

router.get('/', QuestionController.show);

module.exports = router;