

const Router  = require("express").Router();
const Company = require("../models/Company");



// get companies 

Router.get("/companies", (req, res)=>{

    Company.find({}, (err, Companies)=>{

        if(err){

            return res.status(500).send("there was an error geting the companies")
        }

        return res.status(200).send(Companies);


    })

})


// add a company 

Router.post("/companies", (req, res)=>{

        Company.find({company_name: req.body.company_name}, (err, companies)=>{            
            
            if(err){

                return res.status(500).send("there was an error while finding the company");
            }
          
            if(companies.length > 0) return res.status(403).send("the company name is already taken");

            const newCompany = {... req.body};

            Company.create( newCompany, (err)=>{
    
                if(err){                   
                    
                    return res.status(500).send("there was an error")
                }
                
                return res.status(200).send(newCompany);   
    
            })
            
        })
       
});

// show a company


Router.get("/companies/:id", (req, res)=>{


        Company.findById(req.params.id, (err, company)=>{

            if(err){

                return res.status(500).send("there was an error getting your profile");
            }
            if(company===null){

                return res.status(404).send("this profile was not found");
            }
            else{

                return res.status(200).send(company);
            }

        })
})


// update company 


Router.put("/companies/:id", (req, res)=>{

        newCompany = {...req.body}

        Company.find({company_name: req.body.company_name}, (err, companies)=>{            
            
            if(err){

                return res.status(500).send("there was an error while finding the company");
            }
          
            if(companies.length > 0) return res.status(403).send("the company name is already taken");

            Company.findByIdAndUpdate(req.params.id, {$set: newCompany}, (err)=>{

                if(err){

                    console.log(err)
                    return res.status(500).send("There was a problem trying to update");

                    }

                    return res.status(200).send(newCompany);

                } )
        
        })

})







module.exports= Router;