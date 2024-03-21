const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type:String
    },
    color: {
        type:String
    }
});

const Category = mongoose.model("Category", categorySchema); //make collection in database and and do the constrains of the schema on the object of the js

module.exports = Category;
