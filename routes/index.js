// archivo de configuracion de rutas
// importamos nuestro product.router

const express= require('express'); // lo necesitamos para la ruta

const productsRouter= require('./products.router');
const usersRouter= require('./users.router');
const categoriesRouter= require('./categories.router');
const { route } = require('./products.router');

// creamos la funcion que nos permitira asiganr las rutas

function routerApi(app){

  const router= express.Router(); // para escribir una ruta definida
  app.use('/api/v1',router); // creamos el router


  router.use('/products',productsRouter);
  router.use('/users',usersRouter);
  router.use('/categories',categoriesRouter);
}

//exportamos la funcion

module.exports= routerApi;

