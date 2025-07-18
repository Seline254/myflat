const req = require('express/lib/request')
const {Review,User,Apartment} = require('../model/apartmentDB')

// add,flag(by Landlord),delete(admin only),get all,single)


exports.addReview = async(req,res)=>{
    try {
        const role = req.user.role
        // receive data from client
        const {apartmentId,rating,comment}  = req.body

        // restricting reviews to tenants only
        if (role !== "tenant"){
            return res.status(403).json({message:"Reviews are restricted to tenants only"})
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

        const filter = {apartment:apartmentId}
        if(rating){
            filter.rating = Number(rating)//converts from string to number
        }
        const reviews = await Review.find(filter)
        .populate("tenant","name")
        .sort({createdAt:-1}) // sorts the reviews (most recent will come first)

        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
// flag review
exports.flagReview = async(req,res)=>{
    try {
        const role = req.user.role
        if(role !== "landlord") return res.status(403).json({message:"Only landlords can flag reviews"})

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            {isFlagged:true},
            {new:true}
        )
        res.status(200).json({message:"Review Flagged.",review})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// delete review
exports.deleteReview = async(req,res)=>{
    try {
        const role = req.user.role
        if (role !== 'admin' )return res.status(403).json({message:"Only admins can delete a review"})
        const deletedReview = await Review.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Review Deleted Successfully."})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
