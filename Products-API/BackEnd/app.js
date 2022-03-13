const express = require("express");
const app = express()
const router  = require("./model/router")
const connectDB =  require("./Database/db_connection");
const cors = require("cors")

app.use(express.urlencoded())
app.use(cors()) //*middleware for cors issue
app.use(express.json())
app.use("/api/v1",(req,res,next)=>{
    console.log("connected");
    next()
},router)


 const  serverStart = async()=>
{

     try {
         await connectDB()
         app.listen(5000, () => console.log("server is running ...."))
     } catch (error) {
         console.log(error.message);
     }
       
    }
    
serverStart()
