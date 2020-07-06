const router = require("express").Router();

const ProductsController = require("../controllers/products.controller");
const isAdmin = require("../middleware/verifyRole"); // todo, right now always next();
const upload = require("../middleware/fileUpload"); // upload file/image middleware

router.route("/")
.get(ProductsController.showAllProducts)
.post(upload.single("productImage"), ProductsController.createProduct);

router.route("/noimage")
.post(ProductsController.createProductNoImage);

router.route("/:productId")
.get(ProductsController.showProductById)
.patch(isAdmin, ProductsController.updateProduct)
.delete(isAdmin, ProductsController.deleteProduct);


module.exports = router;