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

exports.getAllWithoutAnalist = async (req, res, next) => {
  try {
    const rows = await ticketModel.getAllWithoutAnalist();
    return res.status(200).json({ message: 'Exito', data : rows });
  } catch (err) {
    res.status(500).send('error en: getall ticket');
    next(err);
  }
};

exports.getAllWithAnalist = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await ticketModel.getAllWithAnalist(id);
    return res.status(200).json({ message: 'Exito', data : rows });
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

exports.getEvidencias = async (req, res, nxt) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await ticketModel.getEvidencias(id);
    console.log('Respuesta buffer ticketController', rows)
    return res.status(200).json({ message: 'Exito', data : rows});
  } catch (error) {
    console.log('Error ticketController get Evidencias')
  }
};

exports.getTicketById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await ticketModel.getTicketById(id);
    if (rows.length === 0) {
      return res.status(201).json({ message: 'Ticket no existente'});
    } else {
      const numRes = await ticketModel.getNumResByIdTicket(id)
      if (numRes.length === 0) {
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
    const newTicket = await ticketModel.createTicket(data.body,data.file);
    res.json(newTicket)
  } catch (err) {
    res.status(500).send('Error en create ticket');
  }
};

exports.nuevaRespuesta = async (data, res, next) => {
  try {
    const newRes = await ticketModel.nuevaRespuesta(data.body,data.file);
    res.json(newRes)
  } catch (err) {
    res.status(500).send('Error insertando respuesta');
  }
};

exports.getAllResByTicketId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const Res = await ticketModel.getAllResByTicketId(id);
    return res.status(200).json({ message: 'Exito', data : Res});
  } catch (err) {
    return res.status(200).json({ message: 'Error obteniendo respuestas'});
  }
};

exports.asignarAnalista = async (data, res, next) => {
  try {
    console.log('Asignar::: ', data.body)
    const AsinarAnalista = await ticketModel.asignarAnalista(data.body);
    res.json(AsinarAnalista)
  } catch (err) {
    res.status(500).send('Error insertando respuesta');
  }
};