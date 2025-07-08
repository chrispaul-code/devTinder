const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth=async(req,res,next)=>{

  try{//read the token from the cookie 
    const {Token}=req.cookies || req.headers.authorization?.split("Bearer ")[1] ;

    if(!Token){
        throw new Error("Token is not valid!!")
    }

    // validate the token
    const decodedObj=  await jwt.verify(Token,"CHRIS$1311")

    //find that user
    const {_id}=decodedObj
    const user= await User.findById({_id:_id})
    if(!user){
       throw new Error("User not Found")
    }

    req.user=user
    next();
 }catch(err){
    res.status(404).send("ERROR:"+ err.message);
 }
}

module.exports ={
    userAuth
}