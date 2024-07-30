const session = require('express-session');
require('dotenv').config();

const session_v = {
    // store: new RedisStore({ client }),
    secret: process.env.SECRETKEY_ENV,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: parseInt(process.env.MAXAGE_ENV, 10),
      secure: false,
      httpOnly: true
    }
  }

  module.exports = session(session_v);