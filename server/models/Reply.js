const mongoose = require("mongoose");


const replySchema =  new mongoose.Schema({

        user: { type: mongoose.Schema.Types.objectId,  ref:"User"},
        date: {type: Date, default: Date.now},
        text: String
})


module.exports = mongoose.model("Reply", replySchema );

