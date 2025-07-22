const express = require('express')
const router = express.Router()
const deletionController = require("../controller/deleteController")
const {auth,authorizeRoles} = require('../middleware/auth')

// Deletion routes
router.post('/',auth,authorizeRoles('landlord'),deletionController.createDeletionRequest)
router.get('/',auth,authorizeRoles('admin'), deletionController.getAllDeletions)
router.get('/:id',auth,authorizeRoles('admin'), deletionController.getDeletionById)
router.put('/:id',auth,authorizeRoles('admin'),deletionController.updateDeletion)
router.delete('/:id',auth,authorizeRoles('admin'),deletionController.deleteDeletion)
router.get('/landlord/:landlordId',auth,authorizeRoles('admin','landlord'), deletionController.getDeletionsByLandlord)

module.exports = router
