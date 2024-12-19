const express = require('express');
const ProductController = require('../../controllers/product/product.controller');

const router = express.Router();
const productInstance = new ProductController();

router.post('/product/create', productInstance.createProduct)
router.get('/product/list', productInstance.getProducts)
router.get('/product/:id', productInstance.getProduct)
router.put('/product/update', productInstance.updateProduct)
router.delete('/product/delete/:id', productInstance.deleteProduct)


module.exports = router