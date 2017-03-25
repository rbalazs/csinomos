'use strict';

let db = {};

let Sequelize = require('sequelize');

let sequelize = new Sequelize('main', '', '', {
  host: 'localhost',
  dialect: 'sqlite',
  
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  
  storage: 'db.db'
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;