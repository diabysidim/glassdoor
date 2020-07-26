const               app             = require('express')(),
                    bodyParser      = require('body-parser'),
                    mongoose        = require('mongoose'),
                    userRoute       = require('./routes/User'),
                    companyRoute    = require('./routes/Company'),
                    jobRoute        = require('./routes/Job'),
                    reviewRoute     = require('./routes/Review'),
                    cors            = require("cors")(),
                    loginRoute      = require('./routes/Login'); 




// Use connect method to connect to the server
mongoose.connect('mongodb://localhost:27017/glassdoor', {useNewUrlParser: true});




app.use(cors);
app.use(bodyParser.json()); 
app.use(userRoute);
app.use(companyRoute);
app.use(jobRoute);
app.use(reviewRoute);
app.use(loginRoute);




let port = process.env.PORT || 3000
app.listen(port, ()=>{

    console.log( "Server started on port " + port);
})



            





