// USANDO EL SINGLE RESPONABILITY

// ya qu  isntalamos exprees creamos una constante para decir que queremos a express

const exprees = require('express');

// CREANDO UN ROUTING PROPIO

const router = exprees.Router(); // cambiamodo app. por router

// como vamos a crear una API USAREMOS EL formato JSON DE RESPUESTA
// para agregar mas productos creamos un array

// volavamos esto mas complicado y si pasamos dos parametros como seria y
// capturtando nuestra repsuesta y retornandola
router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json([
    {
      categoryId,
      category: 'Food',
      products: [],
    },
  ]);
});

router.get('/', (req, res) => {
  const { categoryId } = req.params;
  res.json([
    {
      categoryId,
      category: 'Food',
      products: [],
    },
    {
      categoryId,
      category: 'Games',
      products: [],
    },
    {
      categoryId,
      category: 'clothes',
      products: [],
    },
  ]);
});
//FIN RUTAS

module.exports = router;
