const express = require('express')
const router = express.Router()
const reviewController = require('../controller/reviewController')
const {auth,authorizeRoles} = require('../middleware/auth')

router.post('/add',auth,authorizeRoles('tenant'),reviewController.addReview)
router.patch('/:id/flag',auth,authorizeRoles('landlord'),reviewController.flagReview)
router.delete('/:id',auth,authorizeRoles('admin'),reviewController.deleteReview)
router.get('/',reviewController.getReviews)
module.exports = router
