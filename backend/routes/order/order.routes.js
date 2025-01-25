const express = require('express');
const OrderController = require('../../controllers/order/order.controller');

const router = express.Router();
const orderInstance = new OrderController();

router.get('/orders/:id', orderInstance.getOrders)
router.get('/order', orderInstance.getOrder)
router.put('/order/update', orderInstance.updateOrder)
router.delete('/order/delete/:id', orderInstance.deleteOrder)


module.exports = router