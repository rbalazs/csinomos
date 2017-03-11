'use strict';

const express = require('express');

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

const PORT = 8080;

const app = express();

let mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.disable('view cache');

app.use(express.static('public'));

app.get('*', function (req, res) {
  Word.findAll().then(function (words) {
    res.render('index',
      {
        message: "Szavak",
        words: words
      }
    );
  })
});

app.listen(process.env.PORT || PORT);
