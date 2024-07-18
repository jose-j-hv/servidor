var express = require('express');
var router = express.Router();
const centroController = require('../controllers/centroController');

router.get('/', centroController.getAllCentros);
router.get('/getall', centroController.getAllCentros);

module.exports = router;