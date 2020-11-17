const Router  = require("express").Router();
const Company = require("../models/Company");
const isMissing = require("../helper/missingProps");
const isValidEditsProps = require("../helper/isValidEditsProps");
const Auth = require("../middelwares/Auth");
const Review = require("../models/Review");
const Job = require("../models/Job");



// get companies 

Router.get("/companies",  Auth,   (req, res)=>{

        const match ={};
        console.log(req.query.name)
        if(req.query.name){
            
            console.log(req.query.name)
            match.company_name = { "$regex": req.query.name, "$options": "i" };
        }

    Company.find(match, (err, Companies)=>{

        if(err){

            return res.status(500).send("there was an error geting the companies")
        }

        return res.status(200).send(Companies);


    })

})


// add a company 

Router.post("/companies",  Auth, async (req, res)=>{

        const RequiredInfo= ["company_name" , "ceo", "headquarters", "sector"];
        const missingInfo =  isMissing(req.body, RequiredInfo);

        if(missingInfo.length > 0) return res.status(403).send({message:"There are some information are missing", missing: missingInfo})
    

        try{

            const company =  await Company.find({company_name: req.body.company_name})

        
            if(company.length > 0 ) return res.status(403).send("the company name is already taken"); 
        
            newCompany = await Company.create( req.body);

            return res.status(201).send(newCompany);   
        }

        catch (err){
            
            console.log(err)
            return res.status(500).send("there was an error while adding the company")

        }
            
       
});



Router.get("/companies/:id/reviews",  Auth, async (req, res)=>{

    try{

        const reviews = await Review.find({company: req.params.id}).populate("user").populate("company");
        if(!reviews){

            return res.status(404).send("this profile was not found");
        }
        return res.status(200).send(reviews);
        
    }
    catch(e){

        return res.status(500).send("there was an error getting the reviews");

    }
        
   
})

Router.get("/companies/:id/jobs",  Auth,  (req, res)=>{


        
      Job.find({company: req.params.id}, (err, jobs)=>{

        if(err){

            return res.status(500).send("there was an error getting your profile");
        }
        if(!jobs){

            return res.status(404).send("this profile was not found");
        }
        else{

            return res.status(200).send(jobs);
        }

    })
})





Router.get("/companies/:id",  Auth, async (req, res)=>{

        try{

            const company = await Company.findById(req.params.id).populate({path: 'reviews',
            populate: {
              path: 'user',
              model: 'User'}}).populate("jobs").populate("user");
              console.log("companies")

            if(!company){

                return res.status(404).send("this profile was not found");
            }

            return res.status(200).send(company);
        }

        catch{

            return res.status(500).send("there was an error getting your profile");

        }

       

       
})





// update company 


Router.put("/companies/:id", Auth, async (req, res)=>{

       
        const notAllowedUpdates = ["reviews", "jobs", "rating", "reviews"];

        
        const notAllowedItems =  isValidEditsProps(req.body, notAllowedUpdates);

        if(notAllowedItems.length > 0) return res.status(403).send({message:"There are some elements you are not allowed to edit", notAllowed: notAllowedItems})
    

         try{
            const  company= await Company.findOneAndUpdate({loginCredential: req.user.id},  req.body, {new: true});

            if(!company) return res.status(404).send("company is not in the database");
            return res.status(200).send(req.body);
         }  

         catch(e){

            console.log(e);
            return res.status(500).send("there was an error while finding the company");

         }

})







module.exports= Router;