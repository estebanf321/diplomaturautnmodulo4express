var express = require('express');
var router = express.Router();

/* GET servicios. */
router.get('/', function(req, res, next) {
  res.render('servicios', { title: 'Servicios' });
});

module.exports = router;
