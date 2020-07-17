const mongoose =  require("mongoose");
const Company = require("./Company");


const loginSchema = new mongoose.Schema({
   
            username: {
                type: String,
                unique: true,
                index: true,
                required: true
              },
            password: String,
            token: String,
            isUser: Boolean,
            user: { type: mongoose.Schema.Types.ObjectId,  ref:"User" },
            Company: {type: mongoose.Schema.Types.ObjectId, ref:"Company"},

})


module.exports= mongoose.model("Login", loginSchema);