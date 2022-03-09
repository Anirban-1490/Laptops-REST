const express = require("express");
const router = express.Router();
const {getAllProducts,getSingleProduct,getQueryProduct} = require("../controller/controller")


router.get("/",getAllProducts);
router.get("/products",getQueryProduct)
router.get("/:productID",getSingleProduct)

module.exports = router