const express = require("express");
const router = express.Router();
const {getAllProducts,getSingleProduct,getQueryProduct,postProduct,updateProduct,deleteProduct} = require("../controller/controller")

//*middleware for validating input data from client side
const validateData = (req,res,next)=>{
    const receivedData = req.body;
  
    // empty body
    if(Object.entries(receivedData).length == 0) return res.status(406).json({"status":"empty object","time":new Date().toLocaleString()})

    // not every field is presentin the passed body
    if(Object.entries(receivedData).length <9) return res.status(406).json({"status":"missing data","time":new Date().toLocaleString()})

    //some field has data and some don't
    if(Object.entries(receivedData).every(item=>item[1]=='')) return res.status(406).json({"status":"missing data","time":new Date().toLocaleString()})

    next() //if everything goes well then pass onto next middleware
    
}


router.get("/",getAllProducts);
router.get("/products",getQueryProduct)
router.get("/:productID",getSingleProduct)

router.post("/products",validateData,postProduct)

router.put("/:productID",validateData,updateProduct)
router.delete("/:productID",deleteProduct)

module.exports = router