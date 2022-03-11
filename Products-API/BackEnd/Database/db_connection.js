
const mongoose = require("mongoose");

const password = encodeURIComponent("@Anirban45#")
const anotherpaa = encodeURIComponent("JvPEUo7FEwfI8UVO");





const connectDB = ()=>
{
    return mongoose.connect(`mongodb+srv://Anirban45:${anotherpaa}@cluster-anirban.palk8.mongodb.net/LAPTOP-API-DB?retryWrites=true&w=majority`,{socketTimeoutMS:120000})
}

module.exports = connectDB;