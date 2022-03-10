
const mongoose = require("mongoose");

const password = encodeURIComponent("@Anirban45#")

const connectDB = (url)=>
{

   return mongoose.connect(`mongodb+srv://Anirban_1490:${password}@cluster-anirban.palk8.mongodb.net/LAPTOP-API?retryWrites=true&w=majority`,{socketTimeoutMS:120000})
}
module.exports = connectDB;