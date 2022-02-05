const express = require ('express')
const { registerProduct,updateProduct,getProduct,getProductById,deleteProduct,getTopProducts} = require('../controllers/productController');
const router = express.Router();

router.post('/register',registerProduct)
.get('/',getProduct)
.get('/:id',getProductById)
.put('/:id',updateProduct)
.delete('/:id',deleteProduct)
.get('/top', getTopProducts)

module.exports= router