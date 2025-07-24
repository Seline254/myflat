const express = require('express')
const router = express.Router()
const reviewController = require('../controller/reviewController')
const {auth,authorizeRoles} = require('../middleware/auth')

// review routes
router.post('/add',auth,authorizeRoles('tenant'),reviewController.addReview)
router.patch('/flag/:id',auth,reviewController.flagReview)
router.patch('/:id',auth,authorizeRoles('admin'),reviewController.adminDeleteReview)
router.get('/:id',reviewController.getReviews)
module.exports = router
