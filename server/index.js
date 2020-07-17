const               app             = require('express')(),
                    bodyParser      = require('body-parser'),
                    mongoose        = require('mongoose'),
                    userRoute       = require('./routes/User'),
                    companyRoute       = require('./routes/Company');




// Use connect method to connect to the server
mongoose.connect('mongodb://localhost:27017/glassdoor', {useNewUrlParser: true});





app.use(bodyParser.json()); 
app.use(userRoute);
app.use(companyRoute);


let port = process.env.PORT || 3000
app.listen(port, ()=>{

    console.log( "Server started on port " + port);
})



            





