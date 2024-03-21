const express = require("express");
const router = express.Router();


const { isAdmin } = require("../middleware/admin");
const { getAllUsers } = require("../controllers/users.controller");
const { getAllProducts } = require("../controllers/products.controller");
const { getAllCategories } = require("../controllers/category.controller");
const { getOrders } = require("../controllers/order.controller");

router.get("/users",isAdmin,getAllUsers );
router.get("/orders",isAdmin,getOrders );
router.get("/products",isAdmin,getAllProducts );
router.get("/categories",isAdmin,getAllCategories );

module.exports = router;

