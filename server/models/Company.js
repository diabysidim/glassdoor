const mongoose = require("mongoose");


const companySchema = new mongoose.Schema({

        company_name: {
                type: String,
                unique: true,
                index: true,
                required: true
              },
        Ceo: String,
        description:String,
        Headquarters: String,
        size: String,
        Founded: Number,
        sector: String, 
        Revenue: String, 
        rating: Number,
        reviews:[{type: mongoose.Schema.Types.ObjectId, ref:"Review"}]

})


module.exports = mongoose.model("Company", companySchema);

