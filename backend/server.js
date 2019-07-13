const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

let Product = require('./product.model');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
})

const productRoutes = express.Router();
app.use('/products', productRoutes);

productRoutes.get('/', (req, res, next) => {
    Product.find((err, product) => {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});

productRoutes.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Product.findById(id, (err, product) => {
            res.json(product);
    });
});

productRoutes.post('/add', (req, res, next) => {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'product': 'product added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new product failed');
        });
});

productRoutes.post('/update/:id', (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
        if (!product) {
            res.status(404).send('Data is not found');
        } else {
            product.product_name = req.body.product_name;
            product.brand_name = req.body.brand_name;
            product.description = req.body.desciption;
            product.country_code = req.body.country_code;
            product.usage = req.body.usage;
            product.ingredients = req.body.ingredients;
            product.category = req.body.category;

            product.save().then(product => {
                res.json('Product updated!');
            })
            .catch(err => {
                res.status(400).send('Update was unsuccessful');
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});