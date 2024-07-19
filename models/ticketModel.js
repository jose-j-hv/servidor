const db = require('../db');

exports.getAllTickets = async () => {
    try{
      const res = db.query('SELECT * FROM ticket');
      return res;
    } catch (e) {
      console.log('Error get all Ticket')
    }
};

exports.getTicketById = async ( id ) => {
  const sql = 'SELECT * FROM ticket WHERE id = ?';
  try{
    console.log('Value id modelticket', id)
    const [ rows, fields ] = await db.query(sql,[id])
    return rows;
  } catch (e) {
    console.log('Error ticketModel by id')
  }
};

exports.getTicketByEmail = async ({ id }) => {
  const sql = 'SELECT * FROM ticket WHERE email = ?';
  const params = [id];
  try{
    console.log('Value id modelticket', params)
    const result = await db.query(sql)
    return result;
  } catch (e) {
    console.log('Error ticketModel by id')
  }
};

exports.createTicket = async ({ nombre, descripcion }) => {
    const sql = 'INSERT INTO ticket (titulo, descripcion, id_tema, id_ubicacion ) VALUES (?, ?, ?, ? )';
    const params = [nombre, descripcion, 1, 1];
    try {
        const result = await db.query(sql, params)
        return result;
      } catch (error) {
        throw error;
      }
};