const express = require("express");
const router = express.Router();

const controllers = require("../controllers/reviews.controller");
const { auth } = require("../middleware/auth");

router.get("/:id/reviews", controllers.getProductReviews);
// router.post("/:id/ratings",auth, controllers.addProductRating);
// router.post("/:id/reviews",auth, controllers.addProductReviews);
router.post("/:id/ratings",controllers.addProductRating);
router.post("/:id/reviews", controllers.addProductReviews);


module.exports = router;
