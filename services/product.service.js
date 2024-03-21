const Product = require("../models/product.model");

const findAllproducts = async (limit, page, sortField, sortOrder) => {
    const count = await Product.countDocuments();
// 
    let sortDirection = sortOrder === 'desc' ? -1 : 1
   
    const  products = await Product.find()
        .populate('category')
        .limit(parseInt(limit))
        .skip((page - 1) * parseInt(limit))
        .exec();
        products.sort((a, b) => {
            if (sortField === 'category') {
                const nameA = a.category.name.toUpperCase();
                // console.log(nameA )
                const nameB = b.category.name.toUpperCase();
                return nameA.localeCompare(nameB) * (sortOrder === 'desc' ? -1 : 1);
            } else if (sortField === 'price') {
                return (a.price - b.price) * (sortOrder === 'desc' ? -1 : 1);
            }
        });
    
        // const products = await query.exec();

        // products.sort((a, b) => {
        //     if (sortField === 'category') {
        //         const nameA = a.category.name.toUpperCase(); 
        //         const nameB = b.category.name.toUpperCase(); 
        //         if (nameA < nameB) {
        //             return -1 * sortDirection;
        //         }
        //         if (nameA > nameB) {
        //             return 1 * sortDirection;
        //         }
        //         // names must be equal
        //         return 0;
        //     } else if (sortField === 'price') {
        //         return (a.price - b.price) * sortDirection;
        //     }
        // });
    
    return {
        count,
        products
    };
};

const findProductById = async (_id) => {
    return await Product.findOne({
        _id
    }).populate('category');
}
const findProductByName = async (productName) => {
    return Product.findOne({
        productName
    });
}

const createNewProduct = async (productName, category, description, price, image, quantity) => {
    return await Product.create({
        productName,
        category,
        description,
        price,
        image,
        quantity
    })
}


const UpdateProductService = async (_id, body) => {
    return Product.updateOne({
        _id
    }, body)
}
const deleteOneProductService = async (_id, body) => {
    return await Product.deleteOne({
        _id
    })
}

// const deleteAllProductsService= async()=>{
//     return await Product.deleteMany()
// }



module.exports = {
    createNewProduct,
    findProductById,
    findAllproducts,
    findProductByName,
    UpdateProductService,
    deleteOneProductService
}