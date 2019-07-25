import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = props => (
    <tr>
        <td>{props.product.product_name}</td>
        <td>{props.product.brand_name}</td>
        <td>{props.product.description}</td>
        <td>{props.product.country_code}</td>
        <td>{props.product.usage}</td>
        <td>{props.product.ingredients}</td>
        <td>{props.product.category}</td>
        <td>
            <Link to={'/edit/'+props.product._id}>Edit</Link>
        </td>
    </tr>
)
class productList extends Component {

    constructor(props) {
        super(props);
        this.state = {products: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4001/products/')
                .then(res => {
                    this.setState({products: res.data });
                })
                .catch(function(err) {
                    console.log(err);
                });
    }

    productList() {
        return this.state.products.map((currentProduct, i) => {
            return <Product product={currentProduct} key={i} />;
        })
    }
    render () {
        return (
            <div>
                <h3>Product List</h3>
                <table className='table table-striped' style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Brand Name</th>
                            <th>Description</th>
                            <th>Country Code</th>
                            <th>Usage</th>
                            <th>Ingredients</th>
                            <th>Category</th>
                            <th>Edit Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.productList() }
                    </tbody>
                </table>
            </div>
        );
    }
}

export { productList };