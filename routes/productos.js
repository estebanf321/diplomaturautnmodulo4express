var express = require('express');
var router = express.Router();

/* post productos. NO TIENE FUNCION */
router.post('/', function(req, res) {
  
//var title="Productos" ;
var nombre= req.body.nombre;
//var empresa=req.body.empresa;
//var tipoempresa=req.body.tipoempresa;
//var ri=req.body.ri;

console.log(nombre);

res.send(nombre);
res.redirect('/productos');
});


module.exports = router;
