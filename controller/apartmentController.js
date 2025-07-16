const {Apartment} = require('../model/apartmentDB')


// Add apartment
exports.addApartment=async (req,res)=>{
    try {
        // Receive data from client
        const newApartment = req.body
        console.log(newApartment)
        // create an object for the apartment
        const savedApartment = new Apartment(newApartment)
        await savedApartment.save()
        res.json(savedApartment)
    } catch (error) {
        res.status(500).json({message:error.message})

    }
}

//fetching Apartments
exports.getAllApartments = async(req,res)=>{
    try {
        const apartments = await Apartment.find()
        .populate('landlord','name email phone')
        .populate('reviews','rating comment isFlagged isResolved isDeleted')
        res.json(apartments)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//fetching one Apartment
exports.getApartmentById= async (req,res)=>{
    try {
        const apartment = await Apartment.findById(req.params.id)
        .populate('landlord','name email phone')
        .populate('reviews','rating comment isFlagged isResolved isDeleted')
        if (!apartment) return res.status(404).json({message:"Apartment not found"})
        res.status(200).json(apartment)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//update the Apartment
exports.updateApartment = async(req,res)=>{
    try {
        const updateApartment = await Apartment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        if (!updateApartment) return res.status(404).json({message:"Apartment Not Found"})
        res.status(200).json(updateApartment)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//Delete Apartment
exports.deleteApartment = async(req,res)=>{
    try {
        const apartmentId = req.params.id
        const deletedApartment = await Apartment.findByIdAndDelete(apartmentId)
        if(!deletedApartment)return res.status(404).json({message:"Apartment not found"})
        res.json({message:"Apartment deleted successsfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}