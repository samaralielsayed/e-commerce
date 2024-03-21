const express=require('express');
const app=express();
const { getCurrentUserShoppingCart, addBProductsToshoppingCart, updatProductInShoppingCart, deleteProductInShoppingCart, clearCart } = require('../controllers/shoppingCart.controller');
const { search } = require('../controllers/search.controller');
const { auth } = require("../middleware/auth");
const router=express.Router();

router.use(auth);
router.get("/",getCurrentUserShoppingCart);
router.post("/",addBProductsToshoppingCart);
router.get('/search',search)
router.patch("/update/:productId",updatProductInShoppingCart);
router.delete("/remove/:productId",deleteProductInShoppingCart);
router.delete("/clear",clearCart)
module.exports=router;