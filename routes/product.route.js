const express = require("express");
const router = express.Router();

const controllers = require("../controllers/products.controller");
const { isAdmin } = require("../middleware/admin");

router.get("/", controllers.getAllProducts);
router.get("/:id", controllers.getProductById);
router.post("/",isAdmin ,controllers.addProduct);
router.patch("/:id", isAdmin ,controllers.updateProduct);
router.delete("/:id",isAdmin, controllers.deleteProduct);
// router.delete("/",isAdmin, controllers.deleteAllProducts);

module.exports = router;
