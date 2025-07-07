const validator = require('validator');

const validateSignup=(req)=>{

    const {firstName, emailId}=req.body

    if(!(firstName.length>=3 && firstName.length<20)){
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email Address:" + emailId)
    }else if(!validator.isStrongPassword(value)){
            throw new Error("Enter a String Password" + value)
        }
        

}

module.exports={
  validateSignup,
}