const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const dbConnection = require('./connection');
const bloggerRouter = require('./routes/bloggerRouter');


const app = express();

dbConnection();

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "12345",
  key: "blogger_seed",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 300000
  }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => res.status(204));
app.use(bloggerRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).render('404', { title: 'not found' });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(function (req, res) {
  res.render("404", { title: "not found" });
})

module.exports = app;
