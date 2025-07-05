const adminAuth=(req,res,next)=>{
    const result= req.params.id;
    const ans=123
    if(result!=ans){
        res.status(401).send("Unautorized access");
    }else{
        next()
    }
}

const userAuth=(req,res,next)=>{
    const result= req.params.id;
    const ans=123
    if(result!=ans){
        res.status(401).send("Unautorized access");
    }else{
        next()
    }
}

module.exports ={
    adminAuth,userAuth
}