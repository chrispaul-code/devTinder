const mongoose = require("mongoose")

const connectDB=async()=>{
    await mongoose.connect(
    "mongodb+srv://chrispaul1311:Gwagon1311@cluster0.qieipg6.mongodb.net/devTinder"
   );
};


module.exports= connectDB;