const express = require('express');
const {userAuth}=require("../middlewares/auth.js")
const ConnectionRequest =require('../models/connectionRequest.js')
const User=require('../models/user.js')

const requestsRouter=express.Router()

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
        message:`${req.user.firstName} ${status} ${toUser.firstName}`,
        data:data
    })

    }catch(err){
        res.status(404).send("ERROR: "+ err.message)
    }

})

requestsRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  
    try{
    const logInUser=req.user;
    const {status,requestId}=req.params;

    const allowedStatus=["accepted","rejected"];

    if(!allowedStatus.includes(status)){
        throw new Error("Status is invalid")
    }

    const connectionReq= await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:logInUser._id,
        status:"interested"
    })

    if(!connectionReq){
        throw new Error("Connection req not foundddd")
    }

    connectionReq.status=status;

    const data = await connectionReq.save()

    res.json({message:"Connection request "+ data})


    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }


})



module.exports= requestsRouter