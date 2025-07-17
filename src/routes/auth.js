const express= require("express");
const { validateSignup }=require("../utils/validateInfo.js");
const bcrypt = require('bcrypt');
const User=require("../models/user.js");

const authRouter= express.Router();

authRouter.post('/signup',async(req,res)=>{

     try{
      validateSignup(req);

      const {firstName,lastName,emailId,password}=req.body;

      const passwordHash=await bcrypt.hash(password, 10);

          const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });

       await user.save();
       res.send("User Added Syccessfully!")
     }catch(err){
        res.status(400).send("ERROR:"+ err.message);
     }


})

authRouter.post('/login',async(req,res)=>{
   try{
      const {emailId,password}=req.body
      const user = await User.findOne({emailId:emailId});
      if(!user){
         throw new Error("Invalid credentials!!");
      }

      const validPassword=await user.validatePass(password);

      // const validPassword=await bcrypt.compare(password,user.password)

      if(validPassword){
       //Create a JWT token

       const token=await user.getJWT();

      //  const token =await jwt.sign({_id:user._id},"CHRIS$1311",{expiresIn:"1d"});
 
       res.cookie("Token",token, { expires: new Date(Date.now() + 8*900000), httpOnly: true }) //it woll expire in 8*15 min
       res.send(user);
      }else{
         throw new Error("Invalid credentials!!");
      }

   }catch(err){
    res.status(404).send("Error: "+err.message)
   }
})

authRouter.post('/logout',async(req,res)=>{
     res.cookie("Token",null,{
        expires: new Date(Date.now()),
     })
     res.send("Logout Successful");
})



module.exports= authRouter; 