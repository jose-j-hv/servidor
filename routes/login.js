var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/');
router.post('/iniciarSesion', loginController.login);
router.post('/cerrarSesion', loginController.logout);

module.exports = router;