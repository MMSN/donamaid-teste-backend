const express = require('express');

const professionalsController = require('../controllers/professionals');

const router = express.Router();

router.get('/', professionalsController.getProfessionals); 

// Get One Route
router.get("/:professionalsId", professionalsController.getProfessional); 

// Create One Route
router.post('/', professionalsController.postProfessional);

// Edit One Route PUT version
router.put("/:professionalsId", professionalsController.updateProfessional);

// Edit One Route PATCH version
//router.patch("/clients/:id", );

// Delete One Route
router.delete("/:professionalsId", professionalsController.deleteProfessional);

module.exports = router;