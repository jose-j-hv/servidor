const ticketModel = require('../models/ticketModel');

exports.getAllTickets = async (sql, res, next) => {
  try {
    const rows = await ticketModel.getAllTickets();
    res.json(rows)
  } catch (err) {
    res.status(500).send('error en: getall ticket');
    next(err);
  }
};

exports.getTicketById = async (data, res, next) => {
  try {
    console.log('Controllerticket bi id: ', data.body)
    const rows = await ticketModel.getTicketById(data.body);
    console.log('Controllerticket bi id: ', rows)
    res.json(rows)
  } catch (err) {
    res.status(500).send('error en TicketController');
    next(err);
  }
};

exports.createTicket = async (data, res, next) => {
  try {
    const newTicket = await ticketModel.createTicket(data.body);
    res.json(newTicket)
  } catch (err) {
    res.status(500).send('error en create ticket');
    next(err);
  }
};