const mongoose = require("mongoose");
const Review = require("./Review");
//const Reply = require("./Reply");



const userSchema = mongoose.Schema({
        first_name: String,
        last_name: String,
        position: String,
        summary: String,
        loginCredential: {type: mongoose.Schema.Types.ObjectId, ref:"Login"}

})


userSchema.virtual("reviews", {
        ref: "Review",
        localField:"_id",
        foreignField:"user"
})

userSchema.virtual("replies", {
        ref: "Reply",
        localField:"_id",
        foreignField:"user"
})




userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });





module.exports = mongoose.model("User", userSchema)