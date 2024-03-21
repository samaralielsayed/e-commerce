// const Book = require('../models/book.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');
// const {findBooksByTitle}=require('../services/book.service');
// const { getUserBooksService } = require('../services/user.service');
const search = async (req, res) => {
 

    try {
        

    const { productName, categoryName } = req.query;
    const queryLength = Object.keys(req.query).length;

    if (queryLength === 0||!productName) {
      return res.status(400).json({ error: 'At least one query parameter is required.' });
    }
    const filters = {};
    if (productName) {
        filters.productName= { $regex: productName, $options: 'i' }; 
    }

    if (categoryName) {
       let categor={ $regex: categoryName, $options: 'i' }
        const categoryId = await Category.findOne({name:categor});
        //filters.category= { $regex: productName, $options: 'i' }; 

        filters.category = categoryId;
    }
        
    const products = await Product.find(filters).populate("category");
        res.send(products);

    } catch (error) {
        console.error('Error searching for products', error);
        res.status(500).send({ error: 'Error searching for products' });
    }
};
module.exports={search}