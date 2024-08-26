const db = require('../db_config/db');

exports.login = async ( correo ) => {
  const sql = 'SELECT * FROM usuario WHERE correo = ?';
  try{
    const rows = await db.query(sql,[correo]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

exports.permisos_usuarios = async (id_usuario) => {
  const sql = 'SELECT puesto, permiso FROM permisos_usuarios WHERE id_usuario = ?';
  try {
    const [row] = await db.query(sql,[id_usuario]);
    console.log('Response puesto, permiso', row)
    return row;
  } catch (e) {
    throw e;
  }
};