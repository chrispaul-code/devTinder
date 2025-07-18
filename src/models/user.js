const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function capitalizeFirstLetter(value) {
  if (typeof value !== 'string') return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Fistname is required"],
        trime:true,
        set: capitalizeFirstLetter,
    },
    lastName:{
        type:String,
        trime:true,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trime:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address:" + value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        trime:true,

    },
    age:{
        type:Number,
        min:18,
        default:20

    },
    gender:{
        type:String,
        default:"male",
        enum:{
            values:["male", "female","other","Male","Female"],
            message:`{VALUE} id not a valid gender type`
        },

    },
    photoUrl:{
        type:String,
        default:"https://stock.adobe.com/search/images?k=default+profile+picture",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL:" + value)
            }
        }
    },
    skills:{
        type:[String],
    },
    about:{
      type:String,
      default:"This is a default about of the user !"
    }

},{timestamps:true})

userSchema.methods.getJWT=async function () {
    const user=this;

    const token =await jwt.sign({_id:user._id},"CHRIS$1311",{expiresIn:"1d"});
    
    return token
}

userSchema.methods.validatePass=async function (passwordByUser) {
    const user=this;
    const passwordHash=user.password
    const validPassword=await bcrypt.compare(passwordByUser,passwordHash)
    return validPassword
}

const User =mongoose.model('User',userSchema);

module.exports=User;