const mongoose = require("mongoose")

const connectDB=async()=>{
    await mongoose.connect(
    "mongodb+srv://chrispaul1311:Gwagon1311@cluster0.qieipg6.mongodb.net/devTinder"
   );
};


connectDB().then(()=>{
    console.log("Databse connected successfully")
}).catch((err)=>{
    console.log("Databse Cannot be Connected")
})
