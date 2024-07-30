var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');
var db_ss = require('../db_config/db_session');
var Session = require('../middlewares/session');

router.post('/');
router.post('/iniciarSesion', loginController.login);
router.post('/Perfil', Session , loginController.perfil);
router.post('/cerrarSesion', loginController.logout);

module.exports = router;