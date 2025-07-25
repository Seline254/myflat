const {Apartment,Review} = require('../model/apartmentDB')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const upload = multer({dest:'uploads/'})
exports.uploadApartmentImages = upload.array('images', 5)

// Add apartment controller
exports.addApartment = async (req, res) => {
    try {
        // Process uploaded files
        let images = []
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const ext = path.extname(file.originalname)
                const newFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext
                const newPath = path.join('uploads', newFileName)
                fs.renameSync(file.path, newPath)
                images.push(newPath.replace(/\\/g, '/'))
            }
        }

        // Construct apartment data including images and landlord ID
        const newApartmentData = {
            ...req.body,
            landlord: req.user.userId,
            images  // array of image paths saved in apartment document
        }
        console.log(newApartmentData)
        // Create and save apartment document
        const newApartment = new Apartment(newApartmentData)
        const savedApartment = await newApartment.save()

        res.status(201).json(savedApartment)
    } catch (error) {
        res.status(500).json({ message: error.message })
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


// Get reviews for a specific apartment with  limit
exports.getApartmentReviews = async (req, res) => {
    try {
        const apartmentId = req.params.id

        const reviews = await Review.find({ apartmentId })
            .populate('tenant', 'name')
            .limit(2)
            .sort({ createdAt: -1 }) // show the newest review first

        res.status(200).json({ reviews })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Search for a specific apartment.
exports.searchApartments = async (req, res) => {
    try {
        const { county, area, estate_Road, minRent, maxRent } = req.query

        const filter = {}

        if (county) filter['location.county'] = county
        if (area) filter['location.area'] = area
        if (estate_Road) filter['location.estate'] = estate

        if (minRent || maxRent) {
            filter.rent = {}
            if (minRent) filter.rent.$gte = parseInt(minRent)//parse int converts the min rent which mignt be a string to an integer
            if (maxRent) filter.rent.$lte = parseInt(maxRent)
        }

        // Only fetch available apartments
        filter.isAvailable = true

        const results = await Apartment.find(filter).populate('landlord', 'name email')

        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
