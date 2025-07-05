//Creating a Servwr 

const express = require('express');
const app = express();

require("./config/database.js")

const {adminAuth , userAuth} =require("./middlewares/auth.js")

//Error Handling ->try,catch and err in express

app.get("/getUserData",(req,res)=>{
try{
    // throw new Error("error in the code")
    res.send("get all user data ")
}catch(err){
    res.status(500).send(`${err} contact support team`)
}

})

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
})

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
