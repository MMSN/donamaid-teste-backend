const express = require('express');

const clientsController = require('../controllers/clients');

const router = express.Router();

// Get All Route
router.get('/', clientsController.getClients); 

// Get One Route
router.get('/:clientId', clientsController.getClient); 

// Create One Route
router.post('/', clientsController.postClient);

// Edit One Route PUT version
router.put("/:clientId", clientsController.updateClient);

// Edit One Route PATCH version
//router.patch("/clients/:id", );

// Delete One Route
router.delete("/:clientId", clientsController.deleteClient);

module.exports = router;