var express = require('express');
var router = express.Router();
const ticketController = require('../controllers/usersController');

router.get('/', ticketController.getAllUser);
router.get('/all', ticketController.getAllUser);
router.post('/create', ticketController.createUser);

module.exports = router;
