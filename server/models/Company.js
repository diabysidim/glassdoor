const mongoose = require("mongoose");
const validator= require("validator");
const Job =  require("./Job");
const Review =  require("./Review");
// const Reply =  require("./Reply");

const companySchema = new mongoose.Schema({

        company_name: {
                type: String,
                unique: true,
                index: true,
                required: true,
                trim: true
              },
        ceo: {
                type: String,
                required: true,
                trim: true,
                default:""
               
              },
        description:{
                type: String,
                required: false,
                trim: true,
                default:""
              
              },
        headquarters:{
                type: String,
                required: true,
                trim: true,
                default:""
              },
        size: {
                type: String,
                required: false,
                trim: true,
                default:""
              },
        founded: {
                type: String,
                required: false,
                trim: true,
                default:""
              },
        sector: {
                type: String,
                required: true,
                trim: true,
                default:""
              },
        revenue: {
                type: String,
                required: false,
                trim: true,
                default:""
              }, 
        rating: Number,
        loginCredential: {type: mongoose.Schema.Types.ObjectId, ref:"Login"}

})

companySchema.virtual("jobs", {
        ref:"Job",
        localField:"_id",
        foreignField:"company"
})

companySchema.virtual("reviews", {
        ref: "Review",
        localField:"_id",
        foreignField:"company"
})
companySchema.virtual("replies", {
        ref: "Reply",
        localField:"_id",
        foreignField:"company"
})






module.exports = mongoose.model("Company", companySchema);

