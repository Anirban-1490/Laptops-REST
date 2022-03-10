const express = require("express");
const router = express.Router();
const {getAllProducts,getSingleProduct,getQueryProduct,postProduct} = require("../controller/controller")





router.get("/",getAllProducts);
router.get("/products",getQueryProduct)
router.get("/:productID",getSingleProduct)

router.post("/products",postProduct)


module.exports = router