// schemas-(users,apartment,reviews,deliton)
// user schema
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// define user schema
const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String,required:true, unique:true},
    phone:String,
    password:{type:String,required:true},
    isActive:{type:Boolean,default:true},
    role:{type:String,enum:['admin','landlord','tenant'],required:true},
},{timestamps:true}) //handles created at and updated at automatically.

// Apartment Schema
const apartmentSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String},
    type:String, // like a one-bedroom e.t.c
    rent:{type:Number},
    location:{type:String},
    images:{String},
    isAvailable:{type:Boolean,default:true},
    landlord:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:'Review',default:null}]
},{timestamps:true})

// Review Schema
const reviewSchema = new Schema({
    tenant:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true},
    apartmentId:{type:mongoose.Schema.Types.ObjectId,ref:'Apartment', required:true},
    rating:{type:Number,min:1,max:5,required:true},
    comment:String,
    isFlagged:{type:Boolean,default:false},
    // we use[] if multiple people can do a certain thing
    flaggedBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true}],
    isResolved:{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false},
    DeletionFeePaid:{type:Boolean,default:false},
},{timestamps:true})

// Deletion Schema
const deletionSchema = new Schema({
    review:{type:mongoose.Schema.Types.ObjectId,ref:'Review'},
    landlord:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true},
    reason:String,
    isResolved:{type:Boolean,default:false},
    status:{type:String,enum:['pending','approved','rejected'],default:"pending"},
    paymentStatus:{type:String,enum:['unpaid','paid'],default:"unpaid"}
},{timestamps:true})


// prepare exports
const User = mongoose.model("User",userSchema)
const Apartment = mongoose.model("Apartment",apartmentSchema)
const Review = mongoose.model("Review",reviewSchema)
const Deletion = mongoose.model("Deletion",deletionSchema)

module.exports = {User,Apartment,Review,Deletion}





