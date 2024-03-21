const express = require("express");
const router = express.Router();
//import auth controller
const { createCashOrder, getOne, getOrders, cancelOrder, updateOrderTopaid,updateOrderTodelevred,checkOut} = require("../controllers/order.controller");
// router.use(authController.allowedTo("user"), authController.protect);
router.post("/:cartId",createCashOrder);
router.get("/",getOrders);
router.get("/:id",getOne);
router.delete("/:id/cancel",cancelOrder);
router.patch("/:id/pay", updateOrderTopaid );
router.patch("/:id/deliver", updateOrderTodelevred );
router.get("/checkout-session/:cartId",checkOut );
module.exports = router;