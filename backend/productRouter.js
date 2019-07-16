const productRouter = require('express').Router();

let Product = require('./product.model.js');

productRouter.get('/', (req, res, next) => {
    Product.find((err, products) => {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        } else {
            res.json(products);
        }
    });
});

productRouter.post('/add', (req, res, next) => {
    let product = new Product(req.body);
    product.save()
        .then(() => {
            res.status(200).json({'product': 'product added sucessfully'});
        })
        .catch(err => {
            res.status(400).send('adding new product failed');
        });
});

productRouter.param('productId', (req, res, next, id) => {
    const productId = id;
    Product.findById(productId, (err, product) => {
        if (product) {
            req.product = product;
            next();
        } else {
            console.log(productId)
            res.status(404).send('Product not found');
        }
    });
});

productRouter.get('/:productId', (req, res, next) => {
    res.send(req.product);
});

productRouter.post('/update/:productId', (req, res, next) => {
    const updateProduct = new Product(req.product);
    
    updateProduct.product_name = req.body.product_name;
    updateProduct.brand_name = req.body.brand_name;
    updateProduct.description = req.body.description;
    updateProduct.country_code = req.body.country_code;
    updateProduct.usage = req.body.usage;
    updateProduct.ingredients = req.body.ingredients;
    updateProduct.category = req.body.category;

    updateProduct.save()
        .then(product => {
            res.json('Product updated!');
        })
        .catch(err => {
            res.status(400).send('Update was unsuccessful');
        });
});

module.exports = productRouter;