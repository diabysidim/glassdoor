const mongoose =  require("mongoose");
const Company = require("./Company");
const validator  = require("validator");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const User = require("./User");






const loginSchema = new mongoose.Schema({
   
            username: {
              type: String,
              unique: true,
              index: true,
              required: true,
              trim: true,
              validate(value){
                
                  if(!validator.isEmail){

                    throw new error("this is not an email")
                  }
              }
            },
            password: {
              type: String,
              required: true,
              trim: true},

              type: String,

            tokens: [{token: {type: String, require: true}}],

})


loginSchema.virtual("companies", {
    ref: "Company",
    localField:"_id",
    foreignField: "loginCredential"

})

loginSchema.virtual("users", {
  ref:"User",
  localField:"_id",
  foreignField:"loginCredential"
})

loginSchema.methods.generateToken = async function (){

      const token = jwt.sign({id: this._id.toString() }, "thisistheglassdoorappsecret",{expiresIn: "30 minutes"});

      this.tokens.push({token: token});

      return token;

}

loginSchema.methods.toJSON = function () {
    
    const userObject = this.toObject();
   
    delete userObject.password;
    delete userObject.tokens;

  

    return userObject;


}


loginSchema.statics.verifyToken= async function(token){

  try{
    const isVerified = jwt.verify(token, "thisistheglassdoorappsecret");
    return isVerified;

  }
  catch(e){

    console.log(e);
    throw new Error("the token is not valid")
  }
  
}

loginSchema.statics.login= async (username, password)=>{

 
  const user =  await Login.findOne({username});

  if(!user) throw new Error("unable to login 1");

  const isValidPass = await bcrypt.compare(password, user.password);

    
        if(isValidPass) return user;
    
        else  throw new Error("unable to login");


}

loginSchema.pre("remove", async function(next){

  try{

      console.log("is pre firing?", this._id)
      if(this.type === "company" ) {


          await Company.deleteOne({loginCredential: this._id});

          console.log("deleted")
      }
      else if(this.type === "user"){

        await User.deleteOne({loginCredential: this._id});

      }
      else throw new Error("the type is invalid")

      next(); 

  }

  catch(error){

      console.log(error);
       throw new Error( 'the account cannot be deleted')
    }     


})


loginSchema.pre("save", async function(next){

  if(this.isModified('password')){

    this.password = await bcrypt.hash(this.password, 8 );
  }
    

    next();


})


const Login= mongoose.model("Login", loginSchema);

module.exports= Login;