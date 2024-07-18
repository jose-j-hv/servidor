const db = require('../db');

exports.getAllUser = async (sql, res, next) => {
    try {
      const [rows, fields] = await db.query('SELECT * FROM usuario');
      res.render('index', { title: 'Users', data: rows });
      console.log('All gut. user/');
    } catch (err) {
      res.status(500).send('users/ errro');
      next(err);
    }
};

exports.createUser = async (sql, res, next) => {
    try {
      const [rows, fields] = await db.query('Insert into usuario');
      res.render('layout', { title: 'New users', data: '' });
      console.log('All gut. user/');
  
    } catch (err) {
      res.status(500).send('users/ errro');
      next(err);
    }
};
