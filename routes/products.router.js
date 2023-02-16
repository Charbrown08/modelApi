// USANDO EL SINGLE RESPONABILITY

// ya qu  isntalamos exprees creamos una constante para decir que queremos a express

const exprees = require('express');

//borramos faker e importamos nuestro servicio creado products.sevice.j
const productsService = require('./../services/products.service');
//importamos los middleware
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/product.schema');

// CREANDO UN ROUTING PROPIO

const router = exprees.Router(); // cambiamodo app. por router

// creamos la instancia de products service

const service = new productsService();

//FIND ALL WIT async

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// router.get('/',async (req, res) => {
//   const products =await service.find();
//   res.json(products);
// });
// aqui tuvimos que subir este endpoit arriba habra problemas
// todo lo que sea espercifico debe ir antes en un bloque dinamico

// router.get('/filter', (req, res) => {
//   res.send('Soy un filtro');
// });

// comos hay dos productos pero queremos retornar un solo produto creamos un endpoint
// esta vex el get quiere recibir parametros y ese parameto va ser el ID

// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   if (id === '999') {
//     res.status(404).json({
//       message: 'Not Found',
//     });
//   } else {
//     res.status(200).json({
//       id,
//       name: 'Product 2',
//       price: 2000,
//     });
//   }
// });

// METODO FINDONE DESDE

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      // de esta forma le decimos explicitamente que ejecute los middleware
      next(error);
    }
  }
);

//METODO POST
// creamos el body que recibira los parametros

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

//METODO PATCH

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.updated(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// METODO DELETE

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
