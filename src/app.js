const express = require('express');
const app = express();
const connectDB= require("./config/database.js")
const User=require("./models/user.js");
const { validateSignup }=require("./utils/validateInfo.js");
const bcrypt = require('bcrypt');
const cookieParser=require("cookie-parser");
const jwt = require('jsonwebtoken');
const {userAuth}=require("./middlewares/auth.js")



app.use(express.json());
app.use(cookieParser());

app.post('/signup',async(req,res)=>{

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

app.post('/login',async(req,res)=>{
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
       console.log(token)
       res.cookie("Token",token, { expires: new Date(Date.now() + 900000), httpOnly: true })
       res.send("Login Successful!!");
      }else{
         throw new Error("Invalid credentials!!");
      }

   }catch(err){
    res.status(404).send("ERROR:"+ err)
   }
})

app.get('/profile',userAuth,async(req,res)=>{
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

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
   const user=req.user
    res.send("Coonection Request Send By :"+ user.firstName)
})

app.get('/user', async(req,res)=>{
   const user= req.body.emailId;
   try{
    const getuser=await User.find({emailId:user})
     if(getuser.length==0){
        res.status(404).send("User not found")
     }else{
        res.send(getuser)
     }
   }catch(err){
    res.status(404).send("Someting went wrong")
   }
})

app.get('/feed', async(req,res)=>{

   try{
     const getuser=await User.find({})
     if(getuser.length==0){
        res.status(404).send("User not found")
     }else{
        res.send(getuser)
     }
   }catch(err){
    res.status(404).send("Someting went wrong")
   }
})

app.delete('/user',async(req,res)=>{
    const deluser=req.body.userId

    try{
       const user=await User.findByIdAndDelete(deluser)
       res.send("User Dleted Succesfully")
    }catch(err){
        res.status(404).send("Sometinf went wrong")
    }
})

app.patch('/user/:id',async(req,res)=>{
   const upId=req.params.id;
   const data=req.body;

try{
   const ALLOWED_UPDATES=[
      "photoUrl",
      "gender",
      "firstName",
      "lastName"
   ]

   const isUpdateAllowed=Object.keys(data).every((k)=>{
      ALLOWED_UPDATES.includes(k)
   })
   if(isUpdateAllowed){
      throw new Error("Updare not allowed")
   }

    const user=await User.findByIdAndUpdate(upId,data,{returnDocument:"before",runValidators:true})
    console.log(user);
    res.send("User Upadated Succesfully")
}catch(err){
    res.status(404).send("Someting went wrong"+ err)
 }
})

connectDB()
  .then(()=>{
    console.log("Databse connected successfully");
    app.listen(3000,()=>{
    console.log("App listing to port 3000")
   });
  })
  .catch((err)=>{
    console.log("Databse Cannot be Connected"+err)
  })




