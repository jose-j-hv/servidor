const { json } = require('express');
const centroModel = require('../models/centroModel');

exports.getAllCentros = async (sql, res, next) => {
  try {
    const rows = await centroModel.getAllCentros();
    res.json(rows);
  } catch (err) {
    res.status(500).send('error en: getall Centro');
    next(err);
  }
};