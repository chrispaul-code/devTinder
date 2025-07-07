const mongoose = require('mongoose');
const validator = require('validator');

function capitalizeFirstLetter(value) {
  if (typeof value !== 'string') return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
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

    },
    gender:{
        type:String,
        validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("Gender data is not valid");
          }
        }
    },
    photoUrl:{
        type:String,
        default:"https://stock.adobe.com/search/images?k=default+profile+picture",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL:" + value)
            }
        }
    }

},{timestamps:true})

const User =mongoose.model('User',userSchema);

module.exports=User;