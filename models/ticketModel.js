const db = require('../db_config/db');
const fs = require('fs');

exports.getAllTickets = async () => {
    try{
      const res = await db.query('SELECT * FROM ticket');
      return res;
    } catch (e) {
      console.log('Error get all Ticket')
    }
};

exports.getTicketById = async ( id ) => {
  const sql1 = 'SELECT * FROM ticket WHERE id = ?';
  try{
    const [rows] = await db.query(sql1,[id])
    return rows
  } catch (e) {
    console.log('Error ticketModel by id')
    return res.status(500).json({ message: 'Error server' });
  }
};

exports.getTicketByEmail = async ( email ) => {
  const sql = 'SELECT * FROM ticket WHERE email = ?';
  try{
    const rows = await db.query(sql,[email])
    return rows;
  } catch (e) {
    console.log('Error ticketModel by email')
  }
};

exports.getCountTicketIdUser = async ( id ) => {
  const sql = 'SELECT COUNT(id) AS numeroTickets FROM ticket WHERE id_contacto = ?';
  try{
    const [rows] = await db.query(sql,[id])
    return rows;
  } catch (e) {
    console.log('Error ticketModel by idUser')
  }
};

exports.getAllTicketsByIdUser = async ( idUser ) => {
  const sql = 'SELECT * FROM ticket WHERE id_contacto = ?';
  try{
    const rows = await db.query(sql,[idUser])
    console.log('Resultados:: ', rows)
    return rows;
  } catch (e) {
    console.log('Error ticketModel by idUser')
  }
};

exports.createTicket = async ({ titulo, descripcion, temaSelect, idUser, centroSelect, estatus },evidenciaPath ) => {
  const sql = 'INSERT INTO ticket (titulo, descripcion, id_tema, id_contacto ,id_ubicacion ) VALUES (?, ?, ?, ?, ? )';
  const sql2 = 'INSERT INTO estatus (id_ticket, estatus, id_usuario ) VALUES (?, ?, ? )';
  const sql3 = 'INSERT INTO evidencias (id_ticket, id_usuario, evidencia ) VALUES (?, ?, ? )';
  const params = [titulo, descripcion, temaSelect, idUser, centroSelect];
  try {
    const result = await db.query(sql, params)
    const id_ticket = result.insertId
    const params2 = [id_ticket, estatus, idUser];
    const params3 = [id_ticket, idUser, evidencia.buffer];
    await db.query(sql3, params3)
    await db.query(sql2, params2)
    return result;
  } catch (error) {
    throw error;
  }
};

exports.getNumlResByIdTicket = async ( id ) => {
  const sql = 'SELECT COUNT(id) AS numeroRespuestas FROM mensaje WHERE id_ticket = ?'
  try{
    const [rows] = await db.query(sql,[id])
    return rows;
  } catch (e) {
    console.log('Error ticketModel by idUser')
  }
};

exports.getAllResByTicketId = async (id) => {
  const sql = 'SELECT * FROM mensaje where id_ticket = ?'
  try {
    const res = db.query(sql,[id])
    return res;
  } catch (e) {
    throw e;
  }
};

exports.nuevaRespuesta = async ({ id_ticket, id_usuario, mensaje  }) => {
  const sql = 'INSERT INTO mensaje (id_ticket, id_usuario, mensaje) VALUES (?, ?, ? )';
  const params = [id_ticket, id_usuario, mensaje];
  try {
    const result = await db.query(sql, params)
    return result;
  } catch (error) {
    throw error;
  }
};