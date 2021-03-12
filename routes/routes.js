/**
 * Acá dejamos las rutas internas (rutas que asumen que el usuario ya se logueo a nuestra App)
 */
const { Router } = require('express');
const router = Router();
const {User, Cita} = require('../db')

const citas = 
[
  {
      date: "01-20-2021",
      time: "12:20",
      complain: "aaaaaaaaaa aaaa"
  }   
]


// Middleware: Verifica si el usuario está logueado.
// en caso de que no, lo mandamos al login
function checkLogin(req, res, next) {
  if (req.session.user == null) {
    res.redirect('/login');
  }
  res.locals.user = req.session.user;
  /* si llegamos hasta acá, esntonces estamos seguros
   que si existe req.session.user */
  next();
}


router.get('/', checkLogin, async (req, res) => {  
  const citas = await Cita.findAll({
    include: [{model: User}]
  });
  res.render('index.ejs', {citas});
});


//redirigir a crear cita
router.get('/vistaCrear', checkLogin, async (req, res) => {  
  res.render('agendar.ejs');
});

//para mostrar la nueva cita
router.post("/crear",  async (req, res) => {
  let nuevaAgenda = await Cita.create({    
    date: req.body.date,
    time: req.body.time,
    complain: req.body.complain,  
    //usuario: req.body.usuario,
    UserId: req.session.user.id
  });   
  console.log(nuevaAgenda);
  res.redirect('/');
});

router.get('/eliminar/:id', async (req,res) => {
  /*
  if(UserId != user.name){
    return res.send("Error, no tienes permiso para eliminar esta cita");
  }else{
  }
  */
    console.log("Elminarrrrrr");
    //configurar para que solo elimine el paciente 
    const eliminar = await Cita.findByPk(req.params.id);
    await eliminar.destroy();

  res.redirect("/")
});

module.exports = router;