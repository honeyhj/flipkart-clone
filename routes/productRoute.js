const {createProduct,getProductDetailsById,deleteProductById} = require('../controllers/productController');
const { adminCheck, signInCheck } = require('../middleware/authCheck');
const route = require('express').Router()
const upload = require('../middleware/imageMiddleware');

route.post('/addProduct',signInCheck,adminCheck,upload.array("productPictures"),createProduct)
route.get('/getProductDetailsById/:productId',getProductDetailsById)
route.delete('/deleteProductById/:productId',deleteProductById)

module.exports = route;