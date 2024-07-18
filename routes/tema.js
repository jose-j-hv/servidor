var express = require('express');
var router = express.Router();
const temaController = require('../controllers/temaController');

router.get('/', temaController.getAlltemas);
router.get('/getall', temaController.getAlltemas);

module.exports = router;