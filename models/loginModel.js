const db = require('../db_config/db');

exports.login = async ( correo ) => {
  const sql = 'SELECT * FROM usuario WHERE correo = ?'
  try{
    const rows = await db.query(sql,[correo]);
    // console.log('rows::',rows)
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};
