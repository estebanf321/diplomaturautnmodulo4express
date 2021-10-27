var express = require('express');
var router = express.Router();
var UsuariosModel = require('./../models/usuariosModel');


/* GET nosotros. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Ingreso' });
});

/* GET logout. */
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.render('login', { title: 'Ingreso' });
  //res.redirect('/');
});

/* POST . */
router.post('/', async (req,res,next)=>{
  try{
    var usuario = req.body.usuario;
    var password = req.body.password;
    
    // verifique q trae los datos
    //console.log(req.body);
    
    var data= await UsuariosModel.getUserByUsernameAndPassword(usuario,password);

    if (data !=undefined){
      req.session.id_usuario=data.id;
      req.session.nombre=data.usuario;
      res.redirect('/novedades');
    } else{
      res.render('login',{
        error:true,
        title:'Reingreso'
      })
    }

  }catch(error){
    console.log(error);
  }

});


module.exports = router;