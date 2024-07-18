var express = require('express');
var router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/', ticketController.getAllTickets);
router.get('/getall', ticketController.getAllTickets);
router.get('/getone', ticketController.getTicketById);
router.post('/createTicket', ticketController.createTicket);


module.exports = router;
