const express = require('express');
const {userAuth}=require("../middlewares/auth.js")
const { validateEditProfileData }=require("../utils/validateInfo.js");

const profileRouter=express.Router()

profileRouter.get('/profile/view',userAuth,async(req,res)=>{
 try{
   const user=req.user;

   if(!user){
      throw new Error("User Does not Exist")
   }

   res.send(user);

 }catch(err){
    res.status(404).send("ERROR:"+ err)
   }

})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
     if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit Request");
     }
     const loggedInUser=req.user;
        
     Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key] );

     res.json({
        message:`${loggedInUser.firstName} your profile was updated Successfully!!`,
        data: loggedInUser,
     })

     await loggedInUser.save();

    }catch(err){
        res.status(404).send("ERROR: "+err.message)
    }
})

module.exports= profileRouter