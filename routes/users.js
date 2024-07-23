var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUser);
router.get('/all', usersController.getAllUser);
router.post('/getOneByEmail', usersController.getOneByEmail);
router.post('/registrar', usersController.registrarUser);

module.exports = router;
