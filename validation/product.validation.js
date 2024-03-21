const joi = require('joi')
const Product = require('../models/product.model')

const validateProduct = (product) => {
    const schemaRequirements = joi.object({
        productName: joi.string().min(3).max(50).required(),
        category: joi.string().min(3).max(50).required(),
        description: joi.string().min(3).max(50).required(),
        image: joi.string().min(3).max(200).required(),
        price: joi.number().required(),
        quantity: joi.number().required()
    })
    return schemaRequirements.validate(product)
}

module.exports = validateProduct