const express = require('express');
const OrderController = require('../../controllers/order/order.controller');

const router = express.Router();
const orderInstance = new OrderController();

router.get('/orders/:id', orderInstance.getOrders)
router.get('/orders-basket/:id', orderInstance.getOrdersBasket)
router.get('/order', orderInstance.getOrder)
router.put('/order/update', orderInstance.updateOrder)
router.delete('/order/delete/:id', orderInstance.deleteOrder)
router.put('/order/update-status/:id', orderInstance.updateStatusOrder)


module.exports = router