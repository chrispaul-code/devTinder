
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
    },
    photoUrl:{
            type:String,
            ref:"User",
            default:"https://s.yimg.com/zb/imgv1/546fa6f9-9774-3712-885d-f715447ae5a2/t_500x300", 
    }, 
    about:{
        type:String,
        ref:"User",
        default:"This is a default about of the user !"
    },
        age:{
        type:Number,
        ref:"User",
        default:20

    },
    gender:{
        type:String,
        ref:"User",
        default:"Male"

    },
     
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