const express=require("express")
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const ConnectionRequest =require('../models/connectionRequest.js')
const User=require('../models/user.js')


//Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{

  try{
    const logedInUser= req.user;
    const connectionRecived= await ConnectionRequest.find({    
    toUserId:logedInUser._id,
    status:"interested"
   }).populate("fromUserId",["firstName" , "lastName"])

   res.json({
    message:"Data Fetched Successfully!!",
    data:connectionRecived,
   });

  }catch(err){
    res.status(400).send("ERROR: "+err.message)
  }


})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const connectionReq=await ConnectionRequest.find({
            $or:[
                {status:"interested", fromUserId:loggedInUser._id },
                {status:"interested", toUserId:loggedInUser._id }
            ]
        }).populate("fromUserId", ["firstName", "lastName"]).populate("toUserId", ["firstName", "lastName"]);

        const data =connectionReq.map((row)=>{
            if(row.fromUserId._id.toString() == loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({data})


    }catch(err){

    }
})

module.exports=userRouter