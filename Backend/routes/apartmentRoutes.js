const express = require('express')
const router = express.Router()
const apartmentController = require('../controller/apartmentController')

// For authorization purposes
const {auth,authorizeRoles} = require("../middleware/auth")
// apartment routes
router.post("/",auth,authorizeRoles('admin','landlord'),apartmentController.uploadApartmentImages,apartmentController.addApartment)
router.get("/search",apartmentController.searchApartments)
router.get("/",auth,apartmentController.getAllApartments)
router.put("/:id",auth,authorizeRoles('admin',' landlord'),apartmentController.updateApartment)
router.get("/:id",apartmentController.getApartmentById)
router.get("/reviews/:id",apartmentController.getApartmentReviews)
router.delete("/:id",auth,authorizeRoles('admin'),apartmentController.deleteApartment)
module.exports = router 