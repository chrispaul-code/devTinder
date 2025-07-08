const validator = require('validator');

const validateSignup=(req)=>{

    const {firstName, emailId,password}=req.body

    if(!(firstName.length>=3 && firstName.length<20)){
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email Address:" + emailId)
    }else if(!validator.isStrongPassword(password)){
            throw new Error("Enter a Strong Password" + password)
        }
        

}

const validateEditProfileData=(req)=>{
    const allowedEdits=["firstName", "lastName", "age", "gender", "photoUrl", "skills" ,"about"]

    const isEditAllowed = Object.keys(req.body).every((field)=>allowedEdits.includes(field))

    return isEditAllowed
}

module.exports={
  validateSignup,validateEditProfileData
}