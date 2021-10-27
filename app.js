var createError = require('http-errors');
var express = require('express');

//var body_parser = require('body-parser');// agrego middleware body-parser'

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//el dotenv y *session tienen que estar antes que la declaracion de variables
require('dotenv').config();
var session = require('express-session'); //* agrego var session

// ejercicio de base de datos
// var pool = require('./models/db');

// pool.query("select * from empleados").then(function (resultados) {
//   console.log(resultados);
// });

var indexRouter = require('./routes/index'); //index
var usersRouter = require('./routes/users');

var nosotrosRouter = require('./routes/nosotros'); //Nosotros
var serviciosRouter = require('./routes/servicios'); //Servicios
var contactoRouter = require('./routes/contacto'); //Contacto

var productosRouter = require('./routes/productos'); //Productos

var loginRouter = require('./routes/login');
var novedadesRouter = require('./routes/novedades'); //Novedades

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//* ponemos paquete de sesion

app.use(session({
  secret: 'CD2021nfnfnftmdmdmkk',
  resave: false,
  saveUninitialized: true 
}));

secured = async (req,res,next)=>{
  try{
    //console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    }else{
      res.redirect('login')
    }
  }catch (error){
    console.log(error);
  }
};

app.use('/', indexRouter); //viene por defecto
app.use('/users', usersRouter);

app.use('/nosotros', nosotrosRouter); //agregado ruteo
app.use('/servicios', serviciosRouter);
app.use('/contacto', contactoRouter);

app.use('/productos', productosRouter);//agregado para POST

app.use('/login',loginRouter);
app.use('/novedades',secured,novedadesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

module.exports = app;
