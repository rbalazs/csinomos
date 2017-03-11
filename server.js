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
let bodyParser = require('body-parser');

const app = express();

let mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.disable('view cache');

app.use(express.static('public'));

let router = express.Router();

router.get('/szotar', function (req, res) {
  Word.findAll().then(function (words) {
    res.render('index',
      {
        message: "Szavak",
        words: words
      }
    );
  })
});

router.route('/word/:word_id')
.put(function (req, res) {
  console.log(req.body);
  Word.findById(req.params.word_id).then(function (word) {
    word[req.body.key] = req.body.value;
    word.save().then(function() {});
  });
});
  app.use('/', router);
  
  app.listen(process.env.PORT || PORT);
