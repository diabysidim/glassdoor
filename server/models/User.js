const mongoose = require("mongoose");




const userSchema = mongoose.Schema({
        first_name: String,
        last_name: String,
        position: String,
        summary: String,
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review"}]
})

module.exports = mongoose.model("User", userSchema)