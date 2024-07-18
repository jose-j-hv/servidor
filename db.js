require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Juan5315',
    database: 'MS',
    port: '3306',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL.');
    connection.release();
  }
});

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.execute(sql, params, (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
  query
};
