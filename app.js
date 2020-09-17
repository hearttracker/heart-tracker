require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');


mongoose
.connect(process.env.MONGODB_URI || 'mongodb://localhost/heart-tracker')
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
hbs.registerHelper("removeYear", function(dateStr) {
  return dateStr.substring(0, dateStr.length - 4);
})

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//session configuration
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 24*60*60*1000},
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24* 60 *60 *1000,
    })
    })
);

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth');
app.use('/', auth);

const doctor = require('./routes/doctor');
app.use('/', doctor);

// const patient = require('./routes/patient');
// app.use('/', patient);

module.exports = app;
