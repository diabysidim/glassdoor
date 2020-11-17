
const Router = require("express")();

const Job = require("../models/Job");
const Company = require("../models/Company");
const User = require("../models/User");
const Auth = require("../middelwares/Auth")






// get Jobs 

Router.get("/jobs", Auth, (req, res)=>{

    const match ={};
    console.log(req.query.name)
    if(req.query.name){
        
        console.log(req.query.name)
        match.job_title = { "$regex": req.query.name, "$options": "i" };
    }

    Job.find(match, (err, jobs)=>{

        if(err){

            return res.status(500).send("there was an error geting the Jobs")
        }

        if(!jobs) return res.status(40)

        return res.status(200).send(jobs);


    })

})


// add a Job 

Router.post("/jobs",  Auth, async (req, res)=>{



            const newJob = {... req.body};

            try{

                const company = await Company.findById(req.body.company);

                if(!company) return res.status(404).send("could not find the company")

                const job =  await Job.create(newJob);
                
                return res.status(200).send(newJob); 


            }
            catch(err){

                console.log(err);
                return res.status(500).send("there was an error posting the job")

            }

      
});

// show a Job


Router.get("/jobs/:id",  Auth, (req, res)=>{


        Job.findById(req.params.id, (err, Job)=>{

            if(err){

                return res.status(500).send("there was an error getting the job description");
            }
            if(Job===null){

                return res.status(404).send("this profile was not found");
            }
            else{

                return res.status(200).send(Job);
            }

        })
})


// update Job 


Router.put("/jobs/:id",  Auth, async (req, res)=>{

  


        const newJob = {... req.body};

        try{

            const company = await Company.findById(req.body.company);

            


            
            const job =  await Job.findByIdAndUpdate(req.params.id, {$set: newJob});

            console.log(req.body)
            console.log(job)

            if(!company || !job) return res.status(404).send("The company or either the job doesn't exist")

            company.save();
            
            return res.status(200).send(newJob); 


        }
        catch(err){

            console.log(err);
            return res.status(500).send("there was an error posting the job")

        }


})



// delete

Router.delete("/jobs/:id",  Auth, async (req, res)=>{


        try{

            const job =  await Job.findById(req.params.id);
            const company  =  await Company.findById(job.company);

            if(!company || !job) return res.status(404).send("The company or either the job doesn't exist");
            const deleteJob = await Job.deleteOne({_id: req.params.id});
            return res.status(200).send(deleteJob);
        }

        catch(err){

            console.log(err);

            res.status(500).status("there was an error deleting the job");
            
        }


})







module.exports= Router;