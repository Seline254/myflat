const req = require('express/lib/request')
const {Review,Deletion} = require('../model/apartmentDB')

// add,flag(by Landlord),delete(admin only),get all,single)


exports.addReview = async(req,res)=>{
    try {
        // receive data from client
        const {apartmentId,rating,comment}= req.body

        if (!apartmentId || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required." })
        }

        // create a review
        const review = new Review(req.body)
        await review.save()
        res.status(201).json({message:"Review created.",review})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// Get a review with filters like a 5-star review or 1 star  by the apartment(specific apartment)
exports.getReviews = async(req,res)=>{
    try {
        const {apartmentId} = req.params
        const {rating} = req.query
        if(rating){
            filter.rating = Number(rating)//converts from string to number
        }
        const reviews = await Review.find({
            apartment: apartmentId,
            isDeleted: false  //filters out the soft deleted ones.
         })
        .populate("tenant","name")
        .sort({createdAt:-1}) // sorts the reviews (most recent will come first)

        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// flag review
exports.flagReview = async (req, res) => {
  try {
    // Fetching the review and populate the apartment to access its landlord
    const review = await Review.findById(req.params.id).populate('apartment')

    if (!review) {
      return res.status(404).json({ message: "Review not found." })
    }

    // Ensure the user is the landlord of the apartment
    // req.user - logged in user
    if (review.apartment.landlord.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the verified landlord can flag this review." })
    }

    // Flag the review
    review.isFlagged = true
    await review.save()

    res.status(200).json({ message: "Review flagged.", review })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// soft delete a review( it will only be visible in the database)
exports.DeleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        // Find the deletion request for this review
        const deletion = await Deletion.findOne({ review: reviewId });

        if (!deletion) {
            return res.status(404).json({ message: 'No deletion request found for this review' });
        }

        // Check if the request is approved and paid
        if (deletion.status !== 'approved' || deletion.paymentStatus !== 'paid') {
            return res.status(403).json({ message: 'Deletion not allowed. Request is not approved or unpaid.' });
        }

        // Proceed to soft delete the review
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            {
                isDeleted: true,
                DeletionFeePaid: true
            },
            { new: true }
        )

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json({ message: 'Review successfully soft deleted', review: updatedReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


