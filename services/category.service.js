const Category = require("../models/category.model");

const findAllproducts=async()=>{
    return await Product.find().populate('category');
}

const findProductById=async(id)=>{
    return await Product.findOne({_id:id});
}
const findCategoryByName=async(name)=>{
    return Category.findOne({ name });
}

const createNewProduct= async(productName,category, description, price, quantity)=>{
    return await Product.create({
        productName,
        category,
        description,
        price,
        quantity
    })
}


module.exports={
    findCategoryByName,
    createNewProduct
}