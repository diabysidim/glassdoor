const Login = require("../models/Login")
const jwt   = require("jsonwebtoken");

module.exports  =  async (req, res, next)=>{

    try{
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded= jwt.verify(token, "thisistheglassdoorappsecret");
        const user = await Login.findOne({_id: decoded.id, "tokens.token": token });

        if(!user){

            throw new Error();
            
        }

        req.user = user;
        req.token =token;

        next();

    }
    catch (err){
        console.log(err)
        return res.status(401).send("Please authenticate");
        }  
   



}