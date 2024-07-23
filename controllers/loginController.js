const { json } = require('express');
const loginModel = require('../models/loginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  const { correo, pass } = req.body;
  const rows = await loginModel.login(correo);
  console.log('Req body::', req.body)
  try{
    if (rows == null){
      return req.json({message: 'Correo no registrado'})
    } else{
      const user = {
        id: rows.id,
        nombre: rows.nombre,
        password: rows.pass
      }
      if (await bcrypt.compare(pass, user.password) == true) {
        console.log('Acceso correcto, usuario y contraseña correctos')
        res.status(200).json({ message: 'Login successful' });
        const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
      } else {
        console.log('Error al iniciar sesion, no match')
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  } catch (error){
    console.log('Error al iniciar sesion')
  }
};
