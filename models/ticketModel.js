const db = require('../db_config/db');

exports.getAllTickets = async () => {
    try{
      const res = await db.query('SELECT * FROM ticket');
      return res;
    } catch (e) {
      console.log('Error get all Ticket')
    }
};

exports.getAllWithoutAnalist = async () => {
  try{
    const res = await db.query('SELECT * FROM ticket WHERE id_analista IS NULL');    
    return res;
  } catch (e) {
    console.log('Error get all Ticket getAllAnalist')
  }
};

exports.getAllWithAnalist = async ( id ) => {
  const sql = 'SELECT * FROM ticket WHERE id_analista = ?';
  try{
    const res = await db.query(sql, [id])
    return res;
  } catch (e) {
    console.log('Error get all Ticket getAllAnalist')
  }
};

exports.getEvidencias = async (id) => {
  const sql = 'SELECT evidencia, fecha FROM evidencias WHERE id_ticket = ? ORDER BY fecha';
  try{
    const res = await db.query(sql, [id])
    console.log('Evidencas: ticketModel', res)
    return res;
  } catch (e) {
    console.log('Error get all Ticket getAllAnalist')
  }
};

exports.getTicketById = async ( id ) => {
  const sql1 = 'SELECT * FROM ticket WHERE id = ?';
  const sql2 = 'SELECT estatus FROM estatus WHERE id_ticket = ?';
  const sql3 = 'SELECT fecha FROM mensaje WHERE id_ticket = ? ORDER BY fecha DESC LIMIT 1';
  try{
    const [rows] = await db.query(sql1,[id])
    const rows2 = await db.query(sql2, [rows.id])
    if (rows2.length > 0) {
      rows.estatus = rows2[0].estatus;
    } else {
      rows.estatus = 'Abierto'; 
    }
    const rows3 = await db.query(sql3, [rows.id]);
    if (rows3.length > 0) {
      rows.fecha_respuesta = rows3[0].fecha;
    } else {
      rows.fecha_respuesta = 'N/P'; 
    }
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

exports.getAllTicketsByIdUser = async (idUser) => {
  const sql = 'SELECT * FROM ticket WHERE id_contacto = ?';
  const sql2 = 'SELECT estatus FROM estatus WHERE id_ticket = ?';
  const sql3 = 'SELECT fecha FROM mensaje WHERE id_ticket = ? ORDER BY fecha DESC LIMIT 1';
  try {
    const rows = await db.query(sql, [idUser]);
    for (const row of rows) {
      const rows2 = await db.query(sql2, [row.id]);
      if (rows2.length > 0) {
        row.estatus = rows2[0].estatus;
      } else {
        row.estatus = 'Abierto';
      }
      const rows3 = await db.query(sql3, [row.id]);
      if (rows3.length > 0) {
        row.fecha_respuesta = rows3[0].fecha;
      } else {
        row.fecha_respuesta = 'N/R';
      }
    }
    //console.log('Resultados:: ', rows);
    return rows;
  } catch (e) {
    console.error('Error ticketModel by idUser', e);
    throw e; // rethrow the error after logging it
  }
};

//Crear mensaje con 'mensaje' = inicio, relacionado a evidencia
exports.createTicket = async ({ titulo, descripcion, temaSelect, idUser, centroSelect, estatus },evidencia ) => {
  const sql = 'INSERT INTO ticket (titulo, descripcion, id_tema, id_contacto ,id_ubicacion ) VALUES (?, ?, ?, ?, ? )';
  const sql2 = 'INSERT INTO estatus (id_ticket, estatus, id_usuario ) VALUES (?, ?, ? )';
  //const sql3 = 'INSERT INTO evidencias (id_ticket, id_usuario, evidencia ) VALUES (?, ?, ? )';
  const sql3 = 'INSERT INTO evidencias (id_ticket, id_usuario, evidencia ) VALUES (?, ?, ? )';
  const params = [titulo, descripcion, temaSelect, idUser, centroSelect];
    console.log('}Recibido file', evidencia)
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

exports.getCountTicketAnalist = async ( id ) => {
  const sql = ('SELECT COUNT(*) AS numTicketsAnalist FROM ticket WHERE id_analista = ?');    
  try{
    const [response] = await db.query(sql, [id])
    return response;
  } catch (e) {
    console.log('Error get all Ticket getAnalist')
  }
};

exports.getTicketAnalistaCerrados = async ( id ) => {
  const sql = ('SELECT COUNT(*) AS TicketsCerrados FROM ticket WHERE id_analista = ? AND estatus = "Cerrado"');    
  try{
    const [response] = await db.query(sql, [id])
    return response;
  } catch (e) {
    console.log('Error get all Ticket getAnalist')
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

exports.nuevaRespuesta = async ({ id_ticket, id_usuario, mensaje  }, evidencia) => {
  const sql = 'INSERT INTO mensaje (id_ticket, id_usuario, mensaje, evidencia) VALUES (?, ?, ?, ? )';
  const params = [id_ticket, id_usuario, mensaje, evidencia.buffer];
  try {
    const result = await db.query(sql, params)
    return result;
  } catch (error) {
    throw error;
  }
};

exports.asignarAnalista = async ({ idTicket, idUser }) => {
  const sql = 'UPDATE ticket SET id_analista = ? WHERE id = ?;'
  const params = [ idUser, idTicket ]
  try {
    const result = await db.query(sql, params)
    return result;
  } catch (error) {
    console.log('Error asignando ticket', error)
  }
}