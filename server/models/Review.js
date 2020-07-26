
const mongoose =  require("mongoose");


const reviewSchema = new mongoose.Schema({

        company:{type: mongoose.Schema.Types.ObjectId,  ref:"Company"},
        rating: Number,
        user: {type: mongoose.Schema.Types.ObjectId,  ref:"User"},
        date: {type: Date, default: Date.now}, 
        content: String, 
        helpful: Number,
        notHelpful:Number, 
})

reviewSchema.virtual("replies", {
        ref:"Reply",
        localField:"_id",
        foreignField:"review"
})




module.exports= mongoose.model("Review", reviewSchema);

