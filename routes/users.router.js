// USANDO EL SINGLE RESPONABILITY

// ya qu  isntalamos exprees creamos una constante para decir que queremos a express

const exprees = require('express');

// CREANDO UN ROUTING PROPIO

const router = exprees.Router(); // cambiamodo app. por router

// PARAMETROS TIPO QUERY

// ahora cambiamos en vez de params camniamos a query
// limit y offset para la paginaccion
// como son opcionales hacemos un if

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay parametros');
  }
});

// FIN PARAMTROS TIOS QUERY

module.exports=router;
