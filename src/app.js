const express = require('express');
const app = express();
const connectDB= require("./config/database.js")
const cookieParser=require("cookie-parser");

app.use(express.json({limit:"50kb"}));
app.use(cookieParser());

const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter); 


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




