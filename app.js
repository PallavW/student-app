var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//http://localhost/
app.use('/', indexRouter);

//http://localhost/student
/*
node app.js
curl http://localhost:8080/students
curl -i -X POST -H 'Accept: application/json' -H 'Content-type: application/json' http://localhost:8080/students -d "name=Tasha&class=BBA&marks=65"
*/
app.use('/students', studentsRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
})

app.listen(8080, ()=>{
  console.log("Served started on Port 8080");
})
module.exports = app;
