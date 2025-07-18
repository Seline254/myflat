const {User,Apartment} = require('../model/apartmentDB')

// add,flag(by Landlord),delete(admin only),filter reviews,upvote a review)

exports.addReview = async(req,res)=>{
    try {
        // receive data from client
        const {flatId,rating,comment} = req.body
        // restricting tenants

        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}