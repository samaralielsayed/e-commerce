const Category = require("../models/category.model");
const Product = require("../models/product.model");


const getAllCategories = async (req, res) => {
const categories = await Category.find();
    if (!categories) res.status(404).send("Invalid Category request");
    else {
        res.send(categories);
    }
};

const getProductByCategoryId = async(req, res)=>{
    try{
    const { categoryId } = req.params;
    if(!categoryId){res.status(404).send("Invalid Category")
    return}

    const products =  await Product.find({ category: categoryId});
    if(products.length==0){res.status(404).send("Invalid not found product")
        return
}
    res.send(products);
    }
    catch(error){ 
        res.status(404).send("Invalid Category");
    }

};

const getCategoryById = async(req, res)=>{
const { id } = req.params;
try{
const category = await Category.find({ _id: id });
if(category.length==0){res.status(404).send(" Category not found")
    return}
res.send(category);

}
    catch(error){ 
        res.status(404).send("Not found or Already deleted");

    }
};

const deleteCategoryById = async (req, res) => {
const { id } = req.params;
try{
// const category = await Category.find({ _id: id });
await Category.deleteOne({_id:id})
await Product.deleteMany({category:id});
res.send(`You deleted category with id:${id} and all products in this`);
}
    catch (err){
        res.status(404).send("Not found ot Already deleted");        
    }
};

const deleteAllCategories = async (req, res) => {
    try{
    const category = await Category.deleteMany();
    res.send(`You deleted all categories`);
    }
    catch (error) {
        res.status(404).send("Not found ot Already deleted");
    }
        
};

const updateCategory = async (req, res) => {
const { id } = req.params;
try{
    const category = await Category.findOne({ _id: id });
    const updatedCategory = await Category.updateOne({_id:id},{
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });
    res.send(updatedCategory);
}

    catch (err) {
        res.status(404).send("Category not found");
    }
};

const addCategory = async (req, res) => {
    try{
    const category = await Category.create({ 
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });
    res.send(category);

}
catch(err){
    res.status(404).send("Invalid Category");
}

};



module.exports = {
    getAllCategories,
    getProductByCategoryId,
    addCategory,
    getCategoryById,
    updateCategory,
    deleteCategoryById,
    deleteAllCategories
};
