var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var projectRouter = require('./routes/project')

var app = express();

// creating helper function 
hbs.registerHelper('shortDate', (dateVal) => {
  return new hbs.SafeString(dateVal.toLocalDateString('en-US'))
})

// authentication 
const passport = require('passport');
const session = require('express-session');

// configure passport bfore mapping
app.use(session({
  secret: 'keyur@213',
  resave: false, 
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/user');

// use static auth
passport.use(User.createStrategy());

// serialize and deseralize model 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/Projects', projectRouter);
//app.use('/projects/add', projectRouter)

// connection for Mongo Db
const mongoose = require('mongoose');
// connection string to connect to the Mongo db cluster
const config = require('./config/global'); // specifing the relative path as it's the local module 
const { initialize } = require('passport');
const { DH_NOT_SUITABLE_GENERATOR } = require('constants');
mongoose.connect(config.db)

.then( res => {
  console.log("Connected to the database :)");
}).catch( () => console.log("Error Connecting to the database")); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
