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

exports.getAllTicketsByIdUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await ticketModel.getAllTicketsByIdUser(id);
    return res.status(200).json({ message: 'Exito', data : rows});
  } catch (err) {
    return res.status(500).send({ message: 'Error getAllTicketsByIdUser' });
  }
};

exports.getTicketById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await ticketModel.getTicketById(id);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Ticket no existente'});
    } else {
      const numRes = await ticketModel.getNumlResByIdTicket(id)
      if (rows.length === 0) {
        rows.numeroRespuestas = 0;
      } else {
        rows.numeroRespuestas = parseInt(numRes.numeroRespuestas);
      }
      return res.status(200).json({ message: 'Exito', data : rows});
    }
  } catch (err) {
    return res.status(500).send({ message: 'Error al buscar el ticket' });
  }
};

exports.getTicketByEmail = async (data, res, next) => {

};

exports.createTicket = async (data, res, next) => {
  try {
    const newTicket = await ticketModel.createTicket(data.body);
    res.json(newTicket)
  } catch (err) {
    res.status(500).send('Error en create ticket');
  }
};

exports.nuevaRespuesta = async (data, res, next) => {
  try {
    console.log('Nuevares: ', data.body)
    const newRes = await ticketModel.nuevaRespuesta(data.body);
    res.json(newRes)
  } catch (err) {
    res.status(500).send('Error insertando respuesta');
  }
};

exports.getAllResByTicketId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    console.log('Respuestas antes model: ', id)
    const newRes = await ticketModel.getAllResByTicketId(id);
    console.log('Respuestas despues: ', newRes)
    return res.status(200).json({ message: 'Exito', data : newRes});
  } catch (err) {
    return res.status(200).json({ message: 'Error obteniendo respuestas'});
  }
};
