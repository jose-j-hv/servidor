const ticketModel = require('../models/ticketModel');

exports.getAllTickets = async (req, res, next) => {
  try {
    const rows = await ticketModel.getAllTickets();
    res.json(rows)
  } catch (err) {
    res.status(500).send('error en: getall ticket');
    next(err);
  }
};

exports.getTicketById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await ticketModel.getTicketById(id);
    console.log('Controllerticket rws bi id=== ', rows)
    res.json(rows)
  } catch (err) {
    res.status(500).send('error en TicketController');
    next(err);
  }
};
exports.getTicketByEmail = async (data, res, next) => {

};

exports.createTicket = async (data, res, next) => {
  try {
    const newTicket = await ticketModel.createTicket(data.body);
    res.json(newTicket)
  } catch (err) {
    res.status(500).send('error en create ticket');
  }
};