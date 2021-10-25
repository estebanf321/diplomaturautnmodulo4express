var createError = require('http-errors');
var express = require('express');

//var body_parser = require('body-parser');// agrego middleware body-parser'

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var pool =require('./models/db');

pool.query("select * from empleados").then(function(resultados){
console.log(resultados);
});

var indexRouter = require('./routes/index'); //index
var usersRouter = require('./routes/users');

var nosotrosRouter = require('./routes/nosotros'); //Nosotros
var serviciosRouter = require('./routes/servicios'); //Servicios
var contactoRouter = require('./routes/contacto'); //Contacto

var productosRouter = require('./routes/productos'); //Productos

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //viene por defecto
app.use('/users', usersRouter);

app.use('/nosotros', nosotrosRouter); //agregado ruteo
app.use('/servicios', serviciosRouter);
app.use('/contacto', contactoRouter);

app.use('/productos', productosRouter);//agregado para POST


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
