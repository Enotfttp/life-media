const express = require('express');
const OrderController = require('../../controllers/order/order.controller');

const router = express.Router();
const orderInstance = new OrderController();

router.get('/orders-idle/:id', orderInstance.getFirstStatusOrders)
router.get('/orders/:id', orderInstance.getOrders)
router.get('/order', orderInstance.getOrder)
router.put('/order/update', orderInstance.updateOrder)
router.delete('/order/delete/:id', orderInstance.deleteOrder)
router.put('/order/update-status', orderInstance.updateStatusOrder)
router.put('/order/update-status-basket/:id', orderInstance.updateStatusOrderBasket)


module.exports = router