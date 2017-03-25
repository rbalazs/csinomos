'use strict';

let Sequelize = require('./db').Sequelize;
let sequelize = require('./db').sequelize;

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