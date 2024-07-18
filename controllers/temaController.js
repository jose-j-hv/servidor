const { json } = require('express');
const temaModel = require('../models/temaModel');

exports.getAlltemas = async (sql, res, next) => {
  try {
    const rows = await temaModel.getAllTema();
    res.json(rows);
  } catch (err) {
    res.status(500).send('error en: getall tema');
    next(err);
  }
};
