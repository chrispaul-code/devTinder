const express = require('express');
const {userAuth}=require("../middlewares/auth.js")
const ConnectionRequest =require('../models/connectionRequest.js')
const User=require('../models/user.js')

const requestsRouter=express.Router()

requestsRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
   const user=req.user
    res.send("Coonection Request Send By :"+ user.firstName)
})

requestsRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

    try{
    
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

    const allowedStatus=["ignored","interested"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"Invalid status Type "+ status});
    }

    const toUser= await User.findById(toUserId);

    if(!toUser){
        throw new Error("User Doest exist in DB")
    }

    //If their is  existing connection request
    const existingConnectionReq= await ConnectionRequest.findOne({
        $or:[
            {fromUserId:fromUserId,toUserId:toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ]
    })

 

    if(existingConnectionReq){
        throw new Error("Connection Request Already Exit")
    }

    const connectionRequest =new  ConnectionRequest({
        fromUserId,
        toUserId,
        status,
    }) 

    const data =await connectionRequest .save();

    res.json({
        message:"Connection Request Sent Successfully!!",
        data:data
    })

    }catch(err){
        res.status(404).send("ERROR: "+ err.message)
    }

})

module.exports= requestsRouter