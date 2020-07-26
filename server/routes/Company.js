const Router  = require("express").Router();
const Company = require("../models/Company");
const isMissing = require("../helper/missingProps");
const isValidEditsProps = require("../helper/isValidEditsProps");
const Auth = require("../middelwares/Auth");
const Review = require("../models/Review");
const Job = require("../models/Job");



// get companies 

Router.get("/companies",   (req, res)=>{

    Company.find({}, (err, Companies)=>{

        if(err){

            return res.status(500).send("there was an error geting the companies")
        }

        return res.status(200).send(Companies);


    })

})


// add a company 

Router.post("/companies", async (req, res)=>{

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

// show a company
Router.get("/companies/mycompany",   (req, res)=>{


        
    Company.find({loginCredential: req.user._id}, (err, company)=>{


        if(err){

            return res.status(500).send("there was an error getting your profile");
        }
        if(!company){

            return res.status(404).send("this profile was not found");
        }
        else{

            return res.status(200).send(company);
        }

    })
})

Router.get("/companies/:id/reviews",  (req, res)=>{


        
    Review.find({company: req.params.id}, (err, reviews)=>{

        if(err){

            return res.status(500).send("there was an error getting the reviews");
        }
        if(!reviews){

            return res.status(404).send("this profile was not found");
        }
        else{

            return res.status(200).send(reviews);
        }

    })
})

Router.get("/companies/:id/jobs",  (req, res)=>{


        
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





Router.get("/companies/:id",  (req, res)=>{


        Company.findById(req.params.id, (err, company)=>{

            if(err){

                return res.status(500).send("there was an error getting your profile");
            }
            if(!company){

                return res.status(404).send("this profile was not found");
            }
            else{

                return res.status(200).send(company);
            }

        })
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