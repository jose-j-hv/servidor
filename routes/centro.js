var express = require('express');
var router = express.Router();
const centroController = require('../controllers/centroController');
const verifyToken = require('../middlewares/auth'); 

router.get('/',verifyToken, centroController.getAllCentros);
router.get('/getall',verifyToken, centroController.getAllCentros);

module.exports = router;