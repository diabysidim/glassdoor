const Router = require("express").Router();
const Login =  require("../models/Login");
const User = require("../models/User");
const Auth = require("../middelwares/Auth");
const Company = require("../models/Company");
const Review = require("../models/Review");
const Job= require("../models/Job");
const { findByIdAndUpdate } = require("../models/Job");


const findRelatedProfile= async (user)=>{

    let relatedProfile="";
        if(user.type === "company"){
            await user.populate("companies").execPopulate();
           if(user.companies[0]) relatedProfile= user.companies[0]._id;
            
        }
        else{
            await user.populate("users").execPopulate();
           if(user.users[0]) relatedProfile= user.users[0]._id;

        }

        return relatedProfile;
}


//get users 

Router.get("/LoginCredentials",  async (req, res)=>{

    try{
        const users =  await Login.find({});
        return res.status(200).send({authicated: req.user, users: users}) ;
    }
    catch (e){


        return res.status(500).send("there was a problem getting the users") 

    }
})



// register a user or company 


Router.post("/register", async (req, res)=>{

    

     try{       

        if(req.body.password !== req.body.passwordConf)  return res.status(403).send("the passowrd confirmation and the password are different");
        
        const existingUser = await Login.find({username: req.body.username});

        if(existingUser.length >0)  res.status(400).send("the username is taken");
        const newUser = {... req.body};
        delete newUser.passwordConf;

       
        if( (newUser.company=== null && newUser.user=== null) || (newUser.company && newUser.user) )
             return res.status(400).send("you must register either as a user or a company");

        const user = await new Login(newUser);
        user.save();
        const token = await user.generateToken();

        const relatedProfile = await findRelatedProfile(user);
            
        return res.status(201).send({user, token, relatedProfile});
    
        }
       
        catch(err){
    
            return res.status(500).send("there was a problem creating the user") 
        }



})


// login

Router.put("/logins/:id",  Auth, async (req, res)=>{

    try{
       
        const user = await Login.findByIdAndUpdate(req.params.id, req.body);
    
 
    
       
        return res.status(200).send({ user:user } );

    }
    catch(err){

        console.log(err);
        return res.status(500).send("unable to singnin")
    }
    

})

Router.post("/login",  async (req, res)=>{

    try{
       
        const user = await Login.login(req.body.username, req.body.password);
        const token =  await user.generateToken();
        await user.save();
        
      
        const relatedProfile = await findRelatedProfile(user);
       
        return res.status(200).send({user:user, token: token, relatedProfile:relatedProfile } );

    }
    catch(err){

        console.log(err);
        return res.status(500).send("unable to singnin")
    }
    

})

// verify token


Router.post("/verify", async (req, res)=>{


    try{    
        const isVerified= await Login.verifyToken(req.body.token);
        
        if(isVerified) return res.status(200).send({isVerified: true})
        else throw new Error("cannot be verified")
    }
    catch(e){

        console.log(e);
        return res.status(401).send({isVerified:false})
    }
})


// logout 


Router.post("/logout", Auth, async (req, res)=>{

    try {
        
    
        req.user.tokens = req.user.tokens.filter((token)=> token !== req.token)
        req.user.save();
        return res.status(200).send("logged out")

    } catch (error) {
        console.log(error);
        return res.status(500).send("unable to Logout")

    }


})


Router.post("/logoutall", Auth, async (req, res)=>{

    try {
        
        req.user.tokens = [];
        req.user.save();
        return res.status(200).send("logged out to all")

    } catch (error) {

        console(error);
        return res.status(500).send("unable to Logout")

    }


})


Router.delete("/deleteAccount", Auth, async (req, res)=>{


        try{
            
            
              console.log(req.user)

            if(req.user.type === "company" ) {


                const company =  await Company.findOne({loginCredential: req.user._id}); 
                console.log(company._id);
                await Job.deleteMany({ company: company._id });
                await Review.deleteMany({ company: company._id });
                await Company.deleteOne({_id: company._id })
      
            }
            else if(req.user.type === "user"){
      
                const user = await   user.findOne({loginCredential: req.user._id}); 
                await Review.deleteMany({ user: user._id });
                await User.deleteOne({_id: user._id });
      
            }
            
            const deleted = await Login.deleteOne({_id: req.user._id});
            return res.status(200).send(req.user)
        }

        catch(e){

            console.log(e)
            return res.status(500).send("Account cannot be deleted")

        }



})









module.exports = Router;