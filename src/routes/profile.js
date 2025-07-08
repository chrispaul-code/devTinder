const express = require('express');
const {userAuth}=require("../middlewares/auth.js")

const profileRouter=express.Router()

profileRouter.get('/profile',userAuth,async(req,res)=>{
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

module.exports= profileRouter