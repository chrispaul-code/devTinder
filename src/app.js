//Creating a Servwr 

const express = require('express');
const app = express();

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(3000,()=>{
    console.log("App listing to port 3000")
})
