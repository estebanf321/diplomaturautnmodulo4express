var express = require('express');
var router = express.Router();

/* GET nosotros. */
router.get('/', function(req, res, next) {
  res.render('novedades', { 
    title: 'Novedades',
    usuario: req.session.nombre  
  });
});

module.exports = router;
