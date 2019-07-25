const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const productRouter = require('./productRouter')
const PORT = 4001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/products', productRouter)

mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
})

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});