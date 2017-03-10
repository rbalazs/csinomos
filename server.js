'use strict';

const express = require('express');

const PORT = 8080;

const app = express();

let mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.disable('view cache');
app.get('*', function (req, res) {
  var person = {
    firstName: "Christophe",
    lastName: "Coenraets",
    blogURL: "http://coenraets.org"
  };
  res.render('index',
    {
      message: "Hello World!",
      items: ["name", "two", "three"]
    }
  );
});

app.listen(process.env.PORT || PORT);
