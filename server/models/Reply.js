const mongoose = require("mongoose");


const replySchema =  new mongoose.Schema({

        user: { type: mongoose.Schema.Types.objectId,  ref:"User"},
        company: { type: mongoose.Schema.Types.objectId,  ref:"Company"},

        date: {type: Date, default: Date.now},
        text: String,
        review: {type: mongoose.Schema.Types.ObjectId, ref:"Login"}
})


module.exports = mongoose.model("Reply", replySchema );

