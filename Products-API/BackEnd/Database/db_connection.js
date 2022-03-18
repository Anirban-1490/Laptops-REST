
const mongoose = require("mongoose");
require('dotenv').config()


const connectDB = ()=>
{
    return mongoose.connect(process.env.CONNECTION_STRING,{socketTimeoutMS:120000})
}

module.exports = connectDB;