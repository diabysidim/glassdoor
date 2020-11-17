

const Router = require("express").Router();
const User =  require("../models/User");
const Review = require('../models/Review')
const Auth = require("../middelwares/Auth");
const Company = require("../models/Company");

// get all users



Router.get("/users",  (req, res) => {

    const match ={};
    console.log(req.query.name)
    if(req.query.name){
        
        match.first_name = { "$regex": req.query.name, "$options": "i" };
    }

    User.find(match, (err, users)=>{

        if(err){

            console.log(err);
            return res.status(500).send("There was an error");

        }

        return res.status(200).send(users);

    })
   
})

Router.get("/users/:id/reviews",  async (req, res)=>{


        try{
            const reviews = await Review.find({user: req.params.id}).populate("user").populate("company");
            if(!reviews){

                return res.status(404).send("this profile was not found");
            }

            console.log(reviews);
            return res.status(200).send(reviews);
        }
        catch{
            return res.status(500).send("there was an error getting the reviews");

        }
   
    })
// get user 


Router.get("/users/:id", Auth , async (req, res)=>{


        try{

            const user= await  User.findById( req.params.id).populate("reviews");

            if(user===null){

                return res.status(404).send("User not found");
            }
            
            return res.status(200).send(user);
        }
        catch(e){

            console.log(e)

            return res.status(500).send("There was an error");
        }

          

       


})


//post user 

Router.post("/users", Auth,  (req, res)=>{

        console.log(req.body);

      const newUser= { ...req.body}


        User.create(newUser, (err, user)=>{

            if(err){
                console.log("there was an error: " + err)
                return res.status(500).send("there was an error adding");
            }

            console.log("extrait added");
            return res.status(200).send(user)
        });     
       


    


})


// update user 

Router.put("/users/:id", Auth, (req, res)=>{


        User.findOneAndUpdate({loginCredential: req.user._id}, req.body,{new: true}, (err, user)=>{

        if(err){

            console.log(err);

            return res.status(500).send("there was an error updating the user profile")
        }
        
        return res.status(200).send(req.body);


    });


})









module.exports= Router;