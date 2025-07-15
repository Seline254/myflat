const express = require('express')
const router = express.Router()
const loginController = require('../controller/loginController')

router.post('/register',loginController.registerAdmin)
router.post('/register-landlord',loginController.registerLandlord)
router.post('/register-tenant',loginController.registerTenant)
router.post('/',loginController.login)
module.exports = router