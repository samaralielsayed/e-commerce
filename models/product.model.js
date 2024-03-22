const {
    number,
    string
} = require('joi')
const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        required: true
    },
    description: {
        type: String,
        minLength: 3,
        maxLength: 50
    },
    image: {
        type: String,
        minLength: 3,
        maxLength: 200
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    price: {
        type: Number,
        min: 0,
        required: true

    }
});

const Product = mongoose.model("Product", productSchema) //make collection in database and and do the constrains of the schema on the object of the js

module.exports = Product