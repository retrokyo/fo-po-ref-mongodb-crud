const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema ({
    product_name: {
        type: String,
        lowercase: true
    },

    brand_name: {
        type: String,
        lowercase: true
    },

    description: {
        type: String,
        lowercase: true
    },

    country_code: {
        type: String,
        lowercase: true,
    },

    usage: [{
        type: String,
        lowercase: true
    }],

    ingredients: [{
        type: String,
        lowercase: true
    }],

    category: [{
        type: String,
        lowercase: true
    }]
});

module.exports = mongoose.model('Product', Product, 'products');