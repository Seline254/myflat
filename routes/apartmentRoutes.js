const express = require('express')
const router = express.Router()
const apartmentController = require('../controller/apartmentContller')

// For authorization purposes
const {auth,authorizeRoles} = require("../middleware/auth")
router.post("/",auth,authorizeRoles('admin',' landlord'),apartmentController.addApartment)
router.get("/",auth,apartmentController.getAllApartments)
router.put("/:id",auth,authorizeRoles('admin',' landlord'),apartmentController.updateApartment)
router.delete("/:id",auth,authorizeRoles('admin'),apartmentController.deleteApartment)
module.exports = router 