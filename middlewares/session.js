require('dotenv').config();

function isAuthenticated() {
  return function (req, res, next) {
    try {
      if (req.session.user) {
        return next();
      } else {
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
          // Si es una solicitud AJAX o espera JSON
          return res.status(401).json({ message: 'No autorizado' });
        } else {
          return res.redirect('/');
        }
      }
    } catch (err) {
      console.error('Error en la autenticación:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
};

module.exports = isAuthenticated;