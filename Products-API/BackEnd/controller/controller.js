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

// middleware for query string URL
const getQueryProduct = (req,res)=>
{
   
    const {rating} = req.query;
    if(!rating) return res.status(404).json({"status":"invalid query string","data":[],"time":new Date().toLocaleString()})

    const newData = data.filter(item=> item.rating == rating)

    return res.status(200).json({"status":"success","data":newData,"time":new Date().toLocaleString()})
}


//middleware for add a product

const postProduct = (req,res)=>
{
    const product = req.body;

    // empty body
    if(Object.entries(product).length == 0) return res.status(406).json({"status":"empty object","time":new Date().toLocaleString()})

    // not every field is presentin the passed body
    if(Object.entries(product).length <11) return res.status(406).json({"status":"missing data","time":new Date().toLocaleString()})

    const minimalEntry = Object.entries(product).slice(0,5);
    const newMinimalData = [...data,Object.fromEntries(minimalEntry)]
    const updatedData = [...data_detailed,product];

    return  res.status(200).json({"status":"success","data":newMinimalData,"time":new Date().toLocaleString()})
}



module.exports = {getAllProducts,getSingleProduct,getQueryProduct,postProduct}