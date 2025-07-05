//Creating a Servwr 

const express = require('express');
const app = express();

const {adminAuth , userAuth} =require("./middlewares/auth.js")

//Middleware -> adminAuth , userAuth acts as a middleware 

app.use("/admin/:id",adminAuth);

app.get("/user/:id",userAuth,(req,res)=>{
    res.send("i AM USER")
})

app.get("/admin/:id/getAllData",(req,res)=>{
    res.send("Hello world ")
})

app.get("/admin/:id/getData",(req,res)=>{
    res.send("world ")
})

app.listen(3000,()=>{
    console.log("App listing to port 3000")
})
