const ShoppingCart = require("../models/shoppingCartSchema.model")

const findCurrentUserShoppingCart=async(user)=>{
    return await ShoppingCart.findOne({user}).populate('items.productId')
}
const createCartService=async(cart)=>{
    return  await ShoppingCart.create(cart);
}
const updatProductInShoppingCartService=async(id,req)=>{

    return  await ShoppingCart.updateOne({ _id: id }, req);
}
const findCartById=async(_id)=>{
    return await ShoppingCart.findOne({_id}).populate('items.productId')
}
const deleteCart=async(user)=>{
   const cart = await ShoppingCart.deleteOne({ user})
}

// const findCurrentUserShoppingCart = async (userId) => {
//     try {
//       const userCart = await ShoppingCart.findOne({ user: userId });
//       return userCart;
//     } catch (error) {
//       throw new Error('Error finding user shopping cart');
//     }
//   };
module.exports={
    findCurrentUserShoppingCart,
    createCartService,
    updatProductInShoppingCartService,
    findCartById,
    deleteCart
}