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
   }).populate("fromUserId",["firstName" , "lastName","photoUrl","age","about","gender"]).select("fromUserId")

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
                {status:"accepted", fromUserId:loggedInUser._id },
                {status:"accepted", toUserId:loggedInUser._id }
            ]
        }).populate("fromUserId", ["firstName", "lastName","photoUrl","about","age","gender"]).populate("toUserId", ["firstName", "lastName","photoUrl","about"]);

        const data =connectionReq.map((row)=>{
            if(row.fromUserId._id.toString() == loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.send(data)


    }catch(err){
        res.status(404).send("ERROR : "+ err.message)
    }
})

userRouter.get("/feed",userAuth,async(req,res)=>{
    try {
      //The user should only see user which they have never send any status 
      //The user should not see itself

      //Pagination

      const page= parseInt(req.query.page) || 1;
      let limit= parseInt(req.query.limit) || 10;
      
      limit= limit>50 ? 50 : limit

      const skip=(page-1)*limit;


      
      const loggedInUser=req.user;

      const connectionRequest=await ConnectionRequest.find({
        $or:[
            {toUserId:loggedInUser._id},
            {fromUserId:loggedInUser._id}
        ]
      }).select("fromUserId toUserId");

      const hideUserFromFeed=new Set(); //set datastucture which is a array and it has unique  element 

      connectionRequest.forEach(req=>{
        hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString());
      });


      const users= await User.find({
        $and:[
            {_id:{$nin: Array.from(hideUserFromFeed)}},
            {_id:{$ne: loggedInUser._id}},
        ],
      }).select("firstName lastName about photoUrl").skip(skip).limit(limit)

     res.json({data:users});
    

    } catch (err) {
        res.status(404).send("ERROR: "+ err.message)
    }
})


module.exports=userRouter