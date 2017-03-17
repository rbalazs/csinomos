'use strict';

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

let Word = sequelize.define('word', {
  foreign: {
    type: Sequelize.STRING,
    field: 'foreign'
  },
  plain: {
    type: Sequelize.STRING,
    field: 'plain'
  }
}, {
  freezeTableName: true
});

module.exports = Word;