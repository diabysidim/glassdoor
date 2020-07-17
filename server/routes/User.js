

const Router = require("express").Router();
const User =  require("../models/User");

// get all users

Router.get("/users", (req, res) => {

    User.find({}, (err, users)=>{

        if(err){

            console.log(err);
            return res.status(500).send("There was an error");

        }

        return res.status(200).send(users);

    })
   
})


// get user 


Router.get("/users/:id", (req, res)=>{


        User.findById( req.params.id , (err, user) =>{


            if(err){

                return res.status(500).send("There was an error");
            }

            if(user===null){

                return res.status(404).send("User not found");
            }
            else{

                return res.status(200).send(user);
            }


        } )   

       


})


//post user 

Router.post("/users", (req, res)=>{

        console.log(req.body);

      const newUser= { ... req.body}


        User.create(newUser, (err)=>{

            if(err){
                console.log("there was an error: " + err)
                return res.status(500).send("there was an error adding");
            }

            console.log("extrait added");
        });     
       


    return res.status(200).send(newUser)


})


// update user 

Router.put("/users/:id", (req, res)=>{

    

    const newUser= { ... req.body}


    User.findByIdAndUpdate(req.params.id, {$set: newUser}, (err)=>{

        if(err){

            console.log(err);

            return res.status(500).send("there was an error updating the user profile")
        }
        
        return res.status(200).send(newUser);


    });


})









module.exports= Router;