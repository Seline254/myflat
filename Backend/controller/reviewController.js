
const {Review,Deletion} = require('../model/apartmentDB')

// add,flag(by Landlord and Tenant),delete(admin only),get all,single)


exports.addReview = async(req,res)=>{
    try {
        // receive data from client
        const {apartmentId,rating,comment}= req.body

        if (!apartmentId || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required." })
        }

        // create a review
        const review = new Review({
            ...req.body,
            tenant:req.user.userId
        })
        await review.save()
        res.status(201).json({message:"Review created.",review})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// Get reviews for a specific apartment
exports.getReviews = async (req, res) => {
    try {
        const apartmentId = req.params.id
        const reviews = await Review.find({
            apartmentId,
            isDeleted: false
        })
            .populate("tenant", "name") 
            .sort({ createdAt: -1 })    // Most recent first
            .limit(2);                  

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Flag review
exports.flagReview = async (req, res) => {
    try {
      const review = await Review.findById(req.params.id).populate('apartmentId')
  
      if (!review) {
        return res.status(404).json({ message: "Review not found." })
      }
  
      const userId = req.user.userId.toString()
  
      // Prevent double-flaggingggggg
      if (review.flaggedBy.some(id => id.toString() === userId)) {
        return res.status(400).json({ message: "You have already flagged this review." })
      }
  
      // Add user to flaggedBy list
      review.flaggedBy.push(userId)
      review.isFlagged = true 
      await review.save()
  
      res.status(200).json({ message: "Review flagged successfully.", review })
  
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  

//soft delete a flagged or irrelevant review as admin
exports.adminDeleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id

        // Soft delete: mark as deleted
        const  result = await Review.findByIdAndUpdate(
            reviewId,
            { isDeleted: true },
            { new: true }
        )

        if (!result) {
            return res.status(404).json({ message: "Review not found." });
        }

        res.json("Review deleted successfully")
            
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


