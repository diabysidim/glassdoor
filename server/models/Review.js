
const mongoose =  require("mongoose");


const reviewSchema = new mongoose.Schema({

        job:{type: mongoose.Schema.Types.ObjectId,  ref:"Job"},
        rating: Number,
        postedBy: {type: mongoose.Schema.Types.ObjectId,  ref:"User"},
        date: {type: Date, default: Date.now},  
        Helpful: Number,
        NotHelpful:Number, 
        replies: [ {type: mongoose.Schema.Types.ObjectId, ref:"Reply"}]

})

module.exports= mongoose.model("Review", reviewSchema);

