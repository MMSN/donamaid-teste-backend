const express = require('express');

const addressesController = require('../controllers/addresses');

const router = express.Router();

// Get All Route
router.get('/', addressesController.getAddresses); 

// Get One Route
router.get("/:addressId", addressesController.getAddress); 

// Create One Route
router.post("/", addressesController.postAddress);

// Edit One Route PUT version
router.put("/:addressId", addressesController.updateAddress);

// Edit One Route PATCH version
//router.patch("/clients/:id", );

// Delete One Route
router.delete("/:addressId", addressesController.deleteAddress);

module.exports = router;