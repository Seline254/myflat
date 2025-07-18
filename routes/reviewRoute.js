const express = require('express')
const router = express.Router()
const reviewController = require('../controller/reviewController')

router.post('/add',reviewController.addReview)
router.patch('/:id/flag',reviewController.flagReview)
router.delete('/:id',reviewController.deleteReview)
router.get('/',reviewController.getReviews)
module.exports = router