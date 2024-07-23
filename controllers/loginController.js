const { json } = require('express');
const loginModel = require('../models/loginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "secret";

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
        correo: rows.correo,
        rol: rows.rol,
        password: rows.pass,
      }
      if (await bcrypt.compare(pass, user.password) == true) {
        console.log('Acceso correcto, usuario y contraseña correctos')
        const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });
        return res.status(200).json({ token });
      } else {
        console.log('Error al iniciar sesion, no match')
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  } catch (error){
    console.log('Error al iniciar sesion')
  }
};

exports.logout = async (req, res, next) => {
  return null;
};
