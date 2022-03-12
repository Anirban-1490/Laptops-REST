
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
   const products = await productModel.find();
    const queryParams = req.query;

    //*check if any of query string param has an empty value
    const allValuesThere = Object.entries(queryParams).every(param =>param[1]!='')
    if(!allValuesThere) return res.status(400).json({"status":"invalid query string","data":[],"time":new Date().toLocaleString()})

    let queryResult = []
    if(queryParams.rating)
    {
        queryResult =   products.filter(item=>item.rating >=Number(queryParams.rating))
    }
    if(queryParams.price)
    {
        const [min,max] = queryParams.price.split("_");

        //*if there is already a query result then use that else filter from fresh data of database
        const filteredData = (queryResult.length>0)?queryResult.filter(item=>item.price>=Number(min) && item.price<=Number(max)):products.filter(item=>item.price>=Number(min) && item.price<=Number(max))
        queryResult = filteredData
    }
    if(queryParams.ram)
    {
        const ramEnum = {"0":"2GB","1":"4GB","2":"8GB","3":"16GB","4":"32GB","5":"64GB"}
        const filteredData = (queryResult.length>0)?queryResult.filter(item=>item.ram === ramEnum[queryParams.ram]):products.filter(item=>item.ram === ramEnum[queryParams.ram])
        queryResult = filteredData

    }

    return res.status(200).json({"status":"success","data":queryResult,"time":new Date().toLocaleString()})
}


//middleware for add a product

const postProduct = async (req,res)=>
{
    const product = req.body;

    // empty body
    if(Object.entries(product).length == 0) return res.status(406).json({"status":"empty object","time":new Date().toLocaleString()})

    // not every field is presentin the passed body
    if(Object.entries(product).length <10) return res.status(406).json({"status":"missing data","time":new Date().toLocaleString()})

     await productModel.create(product);

    return  res.status(200).json({"status":"success","time":new Date().toLocaleString()})
}

//middleware for updating a single product

const updateProduct = async(req,res)=>
{
    const update = req.body;
    const {productID} = req.params;
    

    if(Object.entries(update).length == 0) return res.status(406).json({"status":"empty object","time":new Date().toLocaleString()})

     // not every field is present in the passed body
     if(Object.entries(update).length <10) return res.status(406).json({"status":"missing data","time":new Date().toLocaleString()})

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