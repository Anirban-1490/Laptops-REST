const {data} = require("../data")
const {data_detailed} = require("../data-detailed")
const productModel = require("../Database/db_products_model");


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

const postProduct = async (req,res)=>
{
    const product = req.body;

    // empty body
    if(Object.entries(product).length == 0) return res.status(406).json({"status":"empty object","time":new Date().toLocaleString()})

    // not every field is presentin the passed body
    if(Object.entries(product).length <10) return res.status(406).json({"status":"missing data","time":new Date().toLocaleString()})

    const result = await productModel.insertMany(product);

    return  res.status(200).json({"status":"success","time":new Date().toLocaleString()})
}

//middleware for updating a single product

const updateProduct = (req,res)=>
{
    const update = req.body;
    const {productID} = req.params;
    

    if(Object.entries(update).length == 0) return res.status(406).json({"status":"empty object","time":new Date().toLocaleString()})

     // not every field is present in the passed body
     if(Object.entries(update).length <11) return res.status(406).json({"status":"missing data","time":new Date().toLocaleString()})

     const updatedData = data_detailed.map(item=>{
         if(item.id == productID)
         {
             return update;
         }
         return item
     })

     return  res.status(200).json({"status":"success","data":updatedData,"time":new Date().toLocaleString()})
}

// middleware for deleting a product

const deleteProduct = (req,res)=>
{
    const {productID} = req.params;

    const updatedProducts = data_detailed.filter(item=>item.id != productID)
    const updatedMinimalProducts = data.filter(item=>item.id !=productID)

    res.status(200).json(updatedMinimalProducts);
}



module.exports = {getAllProducts,getSingleProduct,getQueryProduct,postProduct,updateProduct,deleteProduct}