require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.HOST_ENV,
  user: process.env.USER_ENV,
  password: process.env.PASSWORD_ENV,
  database: process.env.DATABASE_ENV,
  port: process.env.PORT_ENV,
  waitForConnections: process.env.WAITFORCONNECTION_ENV,
  connectionLimit: process.env.CONNECTIONLIMIT_ENV,
  queueLimit: process.env.QUEUELIMIT_ENV
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
