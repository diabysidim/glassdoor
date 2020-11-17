
const Router = require("express")();

const Review = require("../models/Review");
const Company = require("../models/Company");
const User = require("../models/User");
const Auth = require("../middelwares/Auth");










// add a review 

Router.post("/reviews",  Auth, async (req, res)=>{



            const newReview = {... req.body};

            try{

                //const user = await User.find({loginCredential: req.user._id});

                const review =  await Review.create(newReview);
                
                return res.status(200).send(newReview); 


            }
            catch(err){

                console.log(err);
                return res.status(500).send("there was an error posting the review")

            }

      
});


// update Review 


Router.put("/reviews/:id",  Auth, async (req, res)=>{

  


        const newReview = {... req.body};

        try{

            const user = await User.find({loginCredential: req.user._id});
            
            const review =  await Review.findAndUpdate({user: user._id}, {$set: newReview});

            
            return res.status(200).send(newReview); 


        }
        catch(err){

            console.log(err);
            return res.status(500).send("there was an error posting the Review")

        }


})



// delete

Router.delete("/reviews/:id",  Auth, async (req, res)=>{


        try{

            const user = await User.find({loginCredential: req.user._id});           
            
            
            const deleteReview = await Review.deleteOne({user: user._id});

            return res.status(200).send(deleteReview);
        }

        catch(err){

            console.log(err);

            res.status(500).status("there was an error deleting the Review");
            
        }


})







module.exports= Router;