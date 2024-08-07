var express = require('express');
var router = express.Router();
const temaController = require('../controllers/temaController');
const verifyToken = require('../middlewares/auth'); 
//  const isAuthenticated = require('../middlewares/session'); 

router.get('/', verifyToken, temaController.getAlltemas);
router.get('/getall', verifyToken, temaController.getAlltemas);

module.exports = router;