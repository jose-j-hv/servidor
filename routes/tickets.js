var express = require('express');
var router = express.Router();
const ticketController = require('../controllers/ticketController');
const verifyToken = require('../middlewares/auth');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', verifyToken, ticketController.getAllTickets);
router.get('/getAllWithoutAnalist', verifyToken, ticketController.getAllWithoutAnalist);
router.get('/getAllWithAnalist/:id', verifyToken, ticketController.getAllWithAnalist);
router.get('/getAllByIdUser/:id', verifyToken, ticketController.getAllTicketsByIdUser);
router.get('/getOneById/:id', verifyToken, ticketController.getTicketById);
router.get('/getOneByEmail/:email', verifyToken, ticketController.getTicketByEmail);
router.get('/getAllResByTicketId/:id', verifyToken, ticketController.getAllResByTicketId);
router.get('/getEvidencias/:id', verifyToken, ticketController.getEvidencias);
router.post('/createTicket',upload.single('evidencia'), verifyToken, ticketController.createTicket);
router.post('/nuevaRespuesta',upload.single('evidencia'), verifyToken, ticketController.nuevaRespuesta);
router.post('/asignarAnalista', verifyToken, ticketController.asignarAnalista);

module.exports = router;