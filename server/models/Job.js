const UserSchema =  require('./User'); 
const mongoose  = require("mongoose");

jobSchema =  new mongoose.Schema({

        company:{type: mongoose.Schema.Types.ObjectId, ref:"Company"},
        job_title: String,
        job_description: String,      
        posted_date: {type: Date, default: Date.now},
        location: String,
        salary: String,
        type: String,
        exp_level: String,
        nbr_views: Number,

})

module.exports  = mongoose.model("Job", jobSchema);