const express = require("express");
const app = express()
const router  = require("./model/router")


app.use(express.urlencoded())
app.use(express.json())
app.use("/api/v1",(req,res,next)=>{
    console.log("connected");
    next()
},router)


app.listen(5000,()=>console.log("server is running ...."))