const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

// login/register routes
router.post('/register',userController.registerAdmin)
router.post('/register-landlord',userController.registerLandlord)
router.post('/register-tenant',userController.registerTenant)

/*router.get('/',loginController.)*/
router.post('/',userController.login)

// get users
router.get('/',userController.getAllUsers)
module.exports = router