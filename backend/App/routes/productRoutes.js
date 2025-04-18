const router = require("express").Router()
const { deleteProduct, updateProduct, getProductById, getAllProducts, addProduct } = require('../controllers/admin/productControllers')

router.post("/add-product", addProduct);
router.post("/get-all-products", getAllProducts);
router.post("/get-product-byId", getProductById);
router.post("/update-product", updateProduct);
router.post("/delete-product", deleteProduct);


module.exports = router;