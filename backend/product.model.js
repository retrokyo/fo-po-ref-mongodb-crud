const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema ({
    product_name: String,
    brand_name: String,
    description: String,
    country_code: {
        type: String,
        lowercase: false,
    },
    usage: [String],
    ingredients: [String],
    category: [String]
});

module.exports = mongoose.model('Product', Product);