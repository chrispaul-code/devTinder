const express = require('express');
const app = express();
const connectDB= require("./config/database.js")
const User=require("./models/user.js")

app.use(express.json());

app.post('/signup',async(req,res)=>{
    const user = new User(req.body)

     try{
       await user.save();
       res.send("User Added Syccessfully!")
     }catch(err){
        res.status(400).send("Error Saving The User:"+ err.message);
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
    console.log("Databse Cannot be Connected")
  })




