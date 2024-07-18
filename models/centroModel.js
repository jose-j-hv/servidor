const db = require('../db');

exports.getAllCentros = async () => {
  try{
    const res = db.query('SELECT * FROM ubicacion');
    console.log('Consulta: ', res)
    return res
  } catch (e) {
    console.log('Error getallCentro')
  }
};

exports.getCentroById = (id) => {
    return db.query('SELECT * FROM ubicacion WHERE id = ?', [id]);
};