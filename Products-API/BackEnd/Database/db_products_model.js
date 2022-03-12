const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name required']
    },
    img: {
        type:String,
        required:[true,'image URL required']
    },
    price: {
        type:Number,
        required:[true,'price is required']
    },
    rating:{
        type:Number,
        required:false,
        default:0,
        min:0,
        max:5
    },
    ram:{
        type:String,
        required:[true,'ram details required']
    },
    cpu: {
        type:String,
        required:[true,'cpu details required']
    },
    generation : {
        type:String,
        required:[true,'generation details required']
    },
    gpu :{
        type:String,
        required:[true,'gpu details required']
    },
    vram : {
        type:String,
        required:[true,'vram details required']
    },
    display : {
        type:String,
        required:[true,'display details required']
    }
})

const productModel = mongoose.model("products",productSchema);



module.exports = productModel;