//Creating a Servwr 

const express = require('express');
const app = express();

app.get("/user/:id",(req,res)=>{
    console.log(req.params)
    res.send("hello world")
})

app.get("/abc" , (req,res)=>{
    res.send({name:"Christeen Paul"});
})

app.use("/hel",(req,res)=>{
  res.send("world hello world")
})


app.listen(3000,()=>{
    console.log("App listing to port 3000")
})
