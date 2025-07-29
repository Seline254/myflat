// --- DASHBOARD IDEAS BASED ON SCHEMAS --- //

// 1. ADMIN DASHBOARD
// Summary of entire platform
{
  totalUsers: await User.countDocuments(),
  activeUsers: await User.countDocuments({ isActive: true }),
  totalApartments: await Apartment.countDocuments(),
  availableApartments: await Apartment.countDocuments({ isAvailable: true }),
  totalReviews: await Review.countDocuments(),
  flaggedReviews: await Review.countDocuments({ isFlagged: true }),
  pendingDeletions: await Deletion.countDocuments({ status: "pending" })
}

// 2. LANDLORD DASHBOARD
// Data for landlord's own listings and reviews
const landlordId = req.user.userId
{
  totalListedApartments: await Apartment.countDocuments({ landlord: landlordId }),
  listedApartments: await Apartment.find({ landlord: landlordId }),
  apartmentsWithReviews: await Review.find({ apartmentId: { $in: landlordApartmentIds } }).populate("apartmentId"),
  deletionRequests: await Deletion.find({ landlord: landlordId }).populate("review")
}

// 3. TENANT DASHBOARD
// Reviews written and status
const tenantId = req.user.userId
{
  myReviews: await Review.find({ tenant: tenantId }).populate("apartmentId"),
  flagged: await Review.find({ tenant: tenantId, isFlagged: true }),
  resolvedReviews: await Review.find({ tenant: tenantId, isResolved: true })
}

// 4. REVIEW MANAGEMENT DASHBOARD (for moderation or admin)
{
  allFlaggedReviews: await Review.find({ isFlagged: true }).populate("tenant apartmentId"),
  unresolvedDeletions: await Deletion.find({ isResolved: false }).populate("review landlord"),
  approvedDeletions: await Deletion.find({ status: "approved" }),
  paidDeletions: await Deletion.find({ paymentStatus: "paid" })
}

// 5. STATS PER APARTMENT (for detail page or landlord view)
const apartmentId = req.params.id
{
  apartment: await Apartment.findById(apartmentId).populate("landlord reviews"),
  reviews: await Review.find({ apartmentId }),
  averageRating: await Review.aggregate([
    { $match: { apartmentId: new mongoose.Types.ObjectId(apartmentId) } },
    { $group: { _id: null, avgRating: { $avg: "$rating" } } }
  ])
}

// All queries assume async/await and proper user authentication.
// You can turn these into reusable service functions or plug them into frontend routes or admin panels.
