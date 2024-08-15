const { json } = require('express');
const loginModel = require('../models/loginModel');
const ticketModel = require('../models/ticketModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res, next) => {
  const { correo, pass } = req.body;
  const rows = await loginModel.login(correo);
  try{
    if (!rows){
      return res.status(401).json({ message: 'Correo no registrado', error: 'correo' });
    } else{
      const passpass = rows.pass
      if (await bcrypt.compare(pass, passpass) == true) {
        console.log('Acceso correcto, usuario y contraseña correctos')
      } else {
        return res.status(401).json({ message: 'Error al iniciar sesión, Credenciales no validas', error: 'password' });
      }
      const id = parseInt(rows.id)
      const numeroTickets = await ticketModel.getCountTicketIdUser(id)
      const user = rows
      const token = jwt.sign({ user }, process.env.SECRETKEY_ENV, { expiresIn: "1h" });
      user.numeroTickets = parseInt(numeroTickets.numeroTickets)
      console.log('Impresion user', user)
      /*
      req.session.regenerate((err) => {
        if (err) {
          console.log('Error en req.session: ')
          return next(err);
        }
        req.session.save(() => {
          req.session.logged_in = true;
          req.session.token = token;
          req.session.user = {
            id: rows.id,
            nombre: rows.nombre,
            correo: rows.correo,
            rol: rows.rol
          }
          next(); 
        });
      });
      */
      const message = 'Inicio de sesion correcto'
      delete user.pass;
      return res.status(200).json({ user, token, message });
    }
  } catch (error){
    console.log('Error al iniciar sesion. lc')
  }
};

exports.logout = async (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.err('Error cerrando sesión.')
      return res.redirect('/')
    }
    res.send('Sesión cerrada correctamente.')
  })
};

exports.perfil = async (req, res, next) => {

};