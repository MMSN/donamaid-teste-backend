const express = require('express');

const ordersController = require('../controllers/orders');

const router = express.Router();

//GET /orders/
router.get('/', ordersController.getOrders);

//POST /orders/
router.post('/', ordersController.postOrders);

// Get One Route
router.get('/:orderId', ordersController.getOrder); 

// Edit One Route PUT version
router.put("/:orderId", ordersController.updateOrder);

// Edit One Route PATCH version
//router.patch("/clients/:id", );

// Delete One Route
router.delete('/:orderId', ordersController.deleteOrder);


module.exports = router;