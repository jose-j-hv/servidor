const db = require('../db');

exports.getOneByEmail = async ( correo ) => {
    const sql = 'SELECT * FROM usuario WHERE correo = ?';
    try{
      const res = await db.query(sql,[correo]);
      console.log('Correo existente query: ', res)
      return res;
    } catch (e) {
      console.log('Error getOneByEmail model')
    }
};

exports.registrar = async ( { nombre, correo, password } ) => {
    const sql = 'INSERT INTO usuario (nombre, correo, pass ) VALUES (?, ?, ? )';
    const params = [ nombre, correo, password ];
    try {
        console.log('params antes query: ', params)
        const result = await db.query(sql, params)
        return result;
      } catch (error) {
        console.log('Error reg model')
      }
};