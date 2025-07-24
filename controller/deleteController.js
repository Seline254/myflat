const { Deletion, Review } = require('../model/apartmentDB');

// Create a deletion request
exports.createDeletionRequest = async (req, res) => {
    try {
        const deletionRequest = new Deletion({
            ...req.body,
            landlord:req.user.userId
        })
        const saved = await deletionRequest.save()
        res.status(201).json(saved)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Get all deletion requests
exports.getAllDeletions = async (req, res) => {
    try {
        const deletions = await Deletion.find({
            isResolved:false
        })
            .populate('review')
            .populate('landlord', 'name email')
        res.json(deletions)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get single deletion request
exports.getDeletionById = async (req, res) => {
    try {
        const deletion = await Deletion.findById(req.params.id)
            .populate('review')
            .populate('landlord', 'name email')
        if (!deletion) return res.status(404).json({ message: "Not found" })
        res.json(deletion)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update deletion request
exports.updateDeletion = async (req, res) => {
    try {
        const deletionRequest = await Deletion.findById(req.params.id)
        .populate("review")
        if (!deletionRequest) return res.status(404).json({ message: "Not found" })

        const { status, paymentStatus } = req.body

        if (status) deletionRequest.status = status
        if (paymentStatus) deletionRequest.paymentStatus = paymentStatus

        if (status === 'approved' && paymentStatus === 'paid') {
            await Review.findByIdAndUpdate(deletionRequest.review, {
                isResolved:true,
                isDeleted: true,
                DeletionFeePaid: true
            })
        }
        // Marks the request as solved so when the admin gets all requests, the solved ones will be hidden
        deletionRequest.isResolved = true

        await deletionRequest.save()
        
        res.json(deletionRequest)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a deletion request
exports.deleteDeletion = async (req, res) => {
    try {
        const deleted = await Deletion.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ message: "Not found" })
        res.json({ message: "Deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get deletion requests by a specific landlord
exports.getDeletionsByLandlord = async (req, res) => {
    try {
        const deletions = await Deletion.find({ landlord: req.params.landlordId })
            .populate('review')
        res.json(deletions)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
