
const mongoose=require('mongoose')

const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    status:{
        type:String,
        require:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        }
    }
},{timestamps:true})

connectionRequestSchema.index({fromUserId:1, toUserId:1})

connectionRequestSchema.pre("save", function(next){
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("You cannout send connection request to yourself ")
    }
    next()
})

const ConnectionRequest=new mongoose.model("ConnectionRequests",connectionRequestSchema);

module.exports=ConnectionRequest ;