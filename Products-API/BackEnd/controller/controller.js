
const productModel = require("../Database/db_products_model");



// get all the products
const getAllProducts = async (req,res)=>
{
    const products = await productModel.find(); //get all products from database
    res.status(200).json({"status":"success","data":products,"time":new Date().toLocaleString()});
}

// middleware for a product with it's specified product id

const getSingleProduct =async  (req,res)=>
{

    const {productID} = req.params;
  
  try {
    const askedProduct = await productModel.findById(productID+""); //find the product by id
    if(!askedProduct) return res.status(404).json({"status":"data not found","data":[],"time":new Date().toLocaleString()})

    return res.status(200).json({"status":"success","data":askedProduct,"time":new Date().toLocaleString()})
  } catch (error) {
    return res.status(400).json({"status":"invalid Product ID","data":[],"time":new Date().toLocaleString()})
  }


}

// middleware for query string URL
const getQueryProduct = async(req,res)=>
{
   
    const {rating , ram , price} = req.query;

    let queryResult = {}
    if(rating)
    {
        //* if rating exist then add it to the empty object
        queryResult.rating = {$gte:Number(rating)};
    }
    if(price)
    {
        const [min,max] = price.split("_");

       //*gte = greater than or equals
       //* lte = less than or equals

       //* adding both means implecitly $and
        queryResult.price = {$gte:Number(min),$lte:Number(max)};

    }
    if(ram)
    {
        const ramEnum = {"0":"2GB","1":"4GB","2":"8GB","3":"16GB","4":"32GB","5":"64GB"}
        queryResult.ram = ramEnum[ram];

    }


    const products = await productModel.find(queryResult);

    return res.status(200).json({"status":"success","data":products,"time":new Date().toLocaleString()})
}


//middleware for add a product

const postProduct = async (req,res,next)=>
{
   const product = req.body;

    try {
        await productModel.create(product);

        return  res.status(200).json({"status":"success","time":new Date().toLocaleString()})
    } catch (error) {
        return res.status(406).json({"status":"missing data","time":new Date().toLocaleString()})
    }
}

//middleware for updating a single product

const updateProduct = async(req,res)=>
{
    const update = req.body;
    const {productID} = req.params;
    
     //*find the doc by id and update it 

    await productModel.findByIdAndUpdate(productID,update,{runValidators:true}) //*using runvalidator to enable schema validation as findbyID has limited validation

     return  res.status(200).json({"status":"success","time":new Date().toLocaleString()})
}

// middleware for deleting a product

const deleteProduct = async (req,res)=>
{
    const {productID} = req.params;

    try {
        await productModel.findByIdAndDelete(productID)
        return res.status(200).json({"status":"success","time":new Date().toLocaleString()})
    } catch (error) {
        return res.status(404).json({"status":"Product not found with this ID","data":[],"time":new Date().toLocaleString()})
    }
   
}



module.exports = {getAllProducts,getSingleProduct,getQueryProduct,postProduct,updateProduct,deleteProduct}