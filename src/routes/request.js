const express = require('express');
const {userAuth}=require("../middlewares/auth.js")

const requestsRouter=express.Router()

requestsRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
   const user=req.user
    res.send("Coonection Request Send By :"+ user.firstName)
})

module.exports= requestsRouter