var express = require('express');
var router = express.Router();
const ticketController = require('../controllers/ticketController');
const verifyToken = require('../middlewares/auth'); 

router.get('/', verifyToken, ticketController.getAllTickets);
router.get('/getAllbyUser/:id', verifyToken, ticketController.getAllTicketsByUser);
router.get('/getOneById/:id', verifyToken, ticketController.getTicketById);
router.get('/getOneByEmail/:email', verifyToken, ticketController.getTicketByEmail);
router.post('/createTicket', verifyToken, ticketController.createTicket);

module.exports = router;
