const db = require('../db');

exports.getAllTema = async () => {
  try{
    const res = db.query('SELECT * FROM tema');
    console.log('Consulta: ', res)
    return res
  } catch (e) {
    console.log('Error getallTema')
  }
};

exports.getTemaById = (id) => {
    return db.query('SELECT * FROM ticket WHERE id = ?', [id]);
};