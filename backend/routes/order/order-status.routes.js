const express = require('express');
const OrderStatusController = require('../../controllers/order/order_statuses.controller');

const router = express.Router();
const orderStatusInstance = new OrderStatusController();

router.get('/orders-status', orderStatusInstance.getStatus)

module.exports = router