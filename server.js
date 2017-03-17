'use strict';

const PORT = 8080;

let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let mustacheExpress = require('mustache-express');

let Word = require('./src/model/Word');

let app = express();
let router = express.Router();

app.engine('mustache', mustacheExpress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.disable('view cache');
app.use(express.static('public'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

router.get('/szotar', function (req, res) {
  
  let APIKeyService = require('./src/service/APIKeyService');
  let apiKeyService = new APIKeyService();
  
  let GoogleOauth2UserService = require('./src/service/GoogleOauth2UserService');
  let googleOauth2UserService = new GoogleOauth2UserService();
  
  let IndexController = require('./src/controller/IndexController');
  let controller = new IndexController();
  
  controller.execute(req, res, apiKeyService, Word, googleOauth2UserService);
});

router.route('/word/:word_id')
.put(function (req, res) {
  Word.findById(req.params.word_id).then(function (word) {
    word[req.body.key] = req.body.value;
    word.save().then(function () {
    });
  });
});

app.use('/', router);

app.listen(process.env.PORT || PORT);