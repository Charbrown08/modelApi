// ya qu  isntalamos exprees creamos una constante para decir que queremos a express

const exprees = require('express');

// usamos el cors
const cors=require('cors');
// importamos  la funcion de las rutas
const routerApi = require('./routes');


// importamos los middleware

const {logErrors,errorHandler, boomErrorHandler}=require('./middlewares/error.handler');

//creamos la applicacion express como tal  es unconstructor de la apliccacion

const app = exprees();

// le decimos el puerto en el que queramos que corra

const port = 3000;



// usando el midleware para el metodo post


app.use(exprees.json());

/*
permitir algunos dominios a nuestra  API
*/
const whitelist=['http://localhost:8080','https://myapp.co'];
const options={
  origin:(origin,callback)=>{
    if(whitelist.includes(origin)){
      callback(null,true);
    }else{
      callback(new Error('No permitido'));
    }

  }

}
app.use(cors(options));

// FIN DE PEMITIR


// definmos la ruta con la funcion

routerApi(app);

// usamos los dos middleware
// imorta el orden uno tras el otro



// como ya tenemos el puerto y la app construida necesitamos una ruta y una respuesta

//RUTAS

app.get('/', (req, res) => {
  res.send('Hola mi server en express ');
});

// nota !! ya hemos creaado nuestra ruta por defecto creamos otra

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta ');
});

// agregando los middleware


app.use(logErrors);
app.use( boomErrorHandler);
app.use(errorHandler);




// ahora necesitamos que la app pase por el puerto y verificar que ese sea el puerto

app.listen(port, () => {
  console.log('Mi port es ' + port);
});
