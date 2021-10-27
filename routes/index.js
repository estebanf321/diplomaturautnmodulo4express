var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home_Autopartes' });
});

/* post home page. */
router.post('/ingresar', function(req, res, next) {
  var nombre= req.body.nombre;
  var empresa=req.body.empresa;
  var tipoempresa=req.body.tipoempresa;
  var ri=req.body.ri;


  res.render('productos', { nombre,empresa,tipoempresa, });
});


module.exports = router;