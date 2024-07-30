require('dotenv').config();
const mysql = require('mysql2');

//configuracion de base de datos
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

exports.default=pool;