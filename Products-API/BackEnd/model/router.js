const express = require("express");
const router = express.Router();
const {getAllProducts,getSingleProduct,getQueryProduct,postProduct,updateProduct,deleteProduct} = require("../controller/controller")





router.get("/",getAllProducts);
router.get("/products",getQueryProduct)
router.get("/:productID",getSingleProduct)

router.post("/products",postProduct)

router.put("/:productID",updateProduct)
router.delete("/:productID",deleteProduct)

module.exports = router