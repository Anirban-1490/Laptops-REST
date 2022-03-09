const {data} = require("../data")
const {data_detailed} = require("../data-detailed")



// get all the products
const getAllProducts = (req,res)=>
{
    res.status(200).json(data);
}

// middleware for a product with it's specified product id

const getSingleProduct = (req,res)=>
{

    const {productID} = req.params;
  
    
    if(!data_detailed.find(item=>item.id == productID)) return res.status(404).json({"status":"data not found","data":[],"time":new Date().toLocaleString()})

    data_detailed.find(item=> {
        if(item.id === productID) return res.status(200).json({"status":"success","data":item,"time":new Date().toLocaleString()})
    }) 


}

const getQueryProduct = (req,res)=>
{

    console.log(req.query);
    res.send("hello")
}


module.exports = {getAllProducts,getSingleProduct,getQueryProduct}