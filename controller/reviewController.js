const {User,Apartment} = require('../model/apartmentDB')

// add,flag(by Landlord),delete(admin only),get all,single)

exports.addReview = async(req,res)=>{
    try {
        // receive data from client
        const review = req.body
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}