const express = require("express");
const router = express.Router();
// const {Category} = require("../schema/categorySchema")

const controllers = require("../controllers/category.controller");

router.get("/", controllers.getAllCategories);
router.get("/:id", controllers.getCategoryById);
router.get("/:categoryId/products", controllers.getProductByCategoryId);
router.post("/", controllers.addCategory);
router.patch("/:id", controllers.updateCategory);
router.delete("/:id", controllers.deleteCategoryById);
router.delete("/", controllers.deleteAllCategories);

module.exports = router;
