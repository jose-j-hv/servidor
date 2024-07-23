const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');

exports.getAllUser = async (sql, res, next) => {

};

exports.registrarUser  = async (req, res, next) => {
  try {
    // Check if the email already exists
    const existingUser = await usersModel.getOneByEmail( req.body.correo );
    if (existingUser && existingUser.length > 0) {
      console.log('Correo ya existe')
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await usersModel.registrar({
      nombre: req.body.nombre,
      correo: req.body.correo,
      password: hashedPassword
    });
    res.json(newUser);
  } catch (err) {
    res.status(500).send('Error registrando usuario');
  }
};

exports.getOneByEmail = async (sql, req, next) => {
  try {
    const [rows, fields] = await usersModel.getOneByEmail(req.body.correo);
    res.json(rows)
  } catch (err) {
    res.status(500).send('Error getOneByEmail controller');
    next(err);
  }
};
