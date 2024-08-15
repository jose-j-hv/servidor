var express = require('express');
var router = express.Router();
const ticketController = require('../controllers/ticketController');
const verifyToken = require('../middlewares/auth'); 

router.get('/', verifyToken, ticketController.getAllTickets);
router.get('/getAllByIdUser/:id', verifyToken, ticketController.getAllTicketsByIdUser);
router.get('/getOneById/:id', verifyToken, ticketController.getTicketById);
router.get('/getOneByEmail/:email', verifyToken, ticketController.getTicketByEmail);
router.get('/getAllResByTicketId/:id', verifyToken, ticketController.getAllResByTicketId);
router.post('/createTicket', verifyToken, ticketController.createTicket);
router.post('/nuevaRespuesta', verifyToken, ticketController.nuevaRespuesta);

module.exports = router;
