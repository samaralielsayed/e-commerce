const Product = require('../models/product.model');
const Category = require('../models/category.model');
const validateProduct = require('../validation/product.validation');
const {
    findAllproducts,
    findProductById,
    createNewProduct,
    findProductByName,
    UpdateProductService,
    deleteOneProductService
} = require('../services/product.service')
const {
    findCategoryByName
} = require('../services/category.service');

const getAllProducts = async (req, res) => {
    try {
        const {
            page = 1, limit = 6, sortField='category', sortOrder
        } = req.query;

        const result = await findAllproducts(limit, page, sortField, sortOrder);
        const {
            count,
            products
        } = result;
        res.send({
            currentPage: page,
            totalPages: Math.ceil(count / parseInt(limit)),
            products
        });
    } catch (error) {
        return res.status(500).send("Internal Server Error: " + error.message);
    }
};

const getProductById = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const product = await findProductById(id);
        if (!product) {
            return res.status(400).send("product not found")
        }

        res.send(product);

    } catch (error) {
        return res.status(500).send("product not found");
    }

}


const addProduct = async (req, res) => {

    try {
        const {
            error,
            value
        } = await validateProduct(req.body);
        if (error) {
            res.status(404).send("Invalid request");
            return
        }
        const checkproduct = await findProductByName(value.productName);
        if (checkproduct) {
            return res.status(404).send("product already existed");
        }


        const category = await findCategoryByName(value.category);
        if (!category) {
            return res.status(404).send("wrong category");
        }

        const product = await createNewProduct(value.productName, category["_id"], value.description, value.price, value.image, value.quantity)
        res.send(product)
    } catch (error) {
        return res.status(404).send("inavalid request " + error.message);

    }


}

const updateProduct = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const product = await findProductById(id);
        if (!product) {
            return res.status(404).send("incorrect id")
        }

        await UpdateProductService(id, req.body)
        const updatedProduct = await findProductById(id);
        res.send(updatedProduct);
    } catch (error) {
        res.status(404).send("Invalid request")
        return;
    }
}

const deleteProduct = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const product = await findProductById(id);
        if (!product) {
            return res.status(404).send("Not found or Already deleted")
        }
        await deleteOneProductService(id)
        res.send(` you deleted book with id: ${id}`)
    } catch (error) {
        res.status(404).send(error.message)
    }

}

// const deleteAllProducts = async(req , res) => {
//     try{
//     const product = deleteAllProductsService();
//     res.send(` you deleted all products`)}
//     catch(error){
//         res.status(404).send("No products to delete")
//     }

// }

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};